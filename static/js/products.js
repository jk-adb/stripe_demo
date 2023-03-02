async function createProductList() {
    const params = { limit: 10 };
    const query_params = new URLSearchParams(params); 

    const response = await fetch("/products?" + query_params, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await response.json();

    displayProducts(data);

}

function displayProducts(productlist){

    for (var i = 0; i < productlist.length; i++) {

        var image_url = "/static/img/no-image.png";
        var product_images = productlist[i].images;
        if(product_images != null && product_images.length > 0){
            image_url = product_images[0];
        }

        var item_DOM = "<li class='productitem'>" + 
                "<div class='itemname'>" + productlist[i].name + "</div>" + 
                "<div class='itemdecription'>" + productlist[i].description + "</div>" + 
                "<div class='itemimage'>" +
                    "<img src='" + image_url + "'/>" +
                "</div>" +
                "<div class='itemprice' id='" + productlist[i].default_price + "'></div>" +
                "<div><button id='btn_addtocart_" + productlist[i].id + "'"+
                    "class='btn_addtocart'" +
                    " data-id='" + productlist[i].id + "'" +
                    " data-name='" + productlist[i].name +"'" +
                    " data-priceid='" + productlist[i].default_price + "'" +
                    " data-img='" + image_url + "'" +
                ">" +
                    "Add to Cart</button>" +
                "</div>" +
            "</li>";

        document.getElementById("productlist").insertAdjacentHTML("beforeend", item_DOM);

        var addbutton = document.getElementById("btn_addtocart_" + productlist[i].id);
        addbutton.addEventListener('click', addItemToCart);
        
        var cart_items = JSON.parse(localStorage.getItem("cart_items"));
        if(cart_items != null && cart_items.length > 0){
            var item_index = cart_items.find((obj) => obj.item_id == productlist[i].id);
            if(item_index != null){
                addbutton.disabled = true;
            }
        }
    }
    setItemPrice();
}

function addItemToCart(){
    
    var cart_items = JSON.parse(localStorage.getItem("cart_items"));
    var cart_count = 0;
    var additem = true;
    if(cart_items != null && cart_items.length > 0){
        var item_index = cart_items.find((obj) => obj.item_id == this.dataset.id);
        if(item_index != null){
            additem = false;
        }
        cart_count = cart_items.length;
        console.log(cart_count);
    }else{
        cart_items = [];
    }
    if(additem){
        cart_items.push({
            item_id: this.dataset.id,
            item_name: this.dataset.name,
            item_price: this.dataset.price,
            item_image: this.dataset.img,
        });
        cart_count++;
        update_cart_count(cart_count);
        this.disabled = true;
    }
    localStorage.setItem("cart_items",JSON.stringify(cart_items));
}

function setItemPrice() {
    const itemprices =  document.querySelectorAll('.itemprice');

    Promise.all(Array.from(itemprices).map(async item => {
        const price = await retrievePrice(item.id)
        item.innerHTML = "JPY: " + price;

        var addbutton = document.querySelector("button[data-priceid='" + item.id + "']")
        var data_itemprice = document.createAttribute("data-price");
        data_itemprice.value = price;
        addbutton.setAttributeNode(data_itemprice);
    }));
}

async function retrievePrice(priceid){
    const params = {priceid : priceid};
    const query_params = new URLSearchParams(params); 
    const response = await fetch("/productprice?" + query_params.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const { unit_amount } = await response.json();
    console.log(unit_amount);

    return unit_amount;
}