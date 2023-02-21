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

async function displayProducts(productlist){

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < productlist.length; i++) {

        var itemlist = document.createElement('li'),
        itemname = document.createElement('div'),
        itemdescription= document.createElement('div'),
        itemprice = document.createElement('div'),
        addbutton_container = document.createElement('div'),
        addbutton = document.createElement('button');

        itemlist.classList.add("productitem");

        itemname.classList.add("itemname");
        itemname.appendChild(document.createTextNode(productlist[i].name));

        itemdescription.classList.add("itemdescription");
        itemdescription.appendChild(document.createTextNode(productlist[i].description));

        var itemimage_container = document.createElement('div');
        itemimage_container.classList.add("itemimage");

        var image_url = "/static/img/no-image.png";
        var product_images = productlist[i].images;
        if(product_images != null && product_images.length > 0){
            image_url = product_images[0];
        }

        var itemimage =  document.createElement('img');
        itemimage.src = image_url;
        itemimage_container.appendChild(itemimage);

        var data_itemid = document.createAttribute("data-id");
        data_itemid.value = productlist[i].id;
        addbutton.setAttributeNode(data_itemid);

        var data_itempriceid = document.createAttribute("data-priceid");
        var data_itemprice = document.createAttribute("data-price");
//        data_itemprice.value = productlist[i].defaultprice;

        itemprice.classList.add("itemprice");
        itemprice.id = productlist[i].default_price;
//        itemprice.appendChild(document.createTextNode(productlist[i].default_price));

        data_itempriceid.value = productlist[i].default_price;
        data_itemprice.value = "xxxxx";
        addbutton.setAttributeNode(data_itempriceid);
        addbutton.setAttributeNode(data_itemprice);

        var data_itemname = document.createAttribute("data-name");
        data_itemname.value = productlist[i].name;
        addbutton.setAttributeNode(data_itemname);

        var data_itemimage = document.createAttribute("data-img");
        data_itemimage.value = image_url;
        addbutton.setAttributeNode(data_itemimage);

        addbutton.classList.add("btn_addtocart");
        addbutton.appendChild(document.createTextNode("Add to Cart"));
        //<div class="addtocart"><button class="btn_addtocart" role="button" data-name="1" data-id="qyvOUDHrYISQYuWa" data-price="3">Add to Cart</button></div>
        addbutton.addEventListener('click', function(){
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
                var item_id = this.dataset.id;
                var item_name = this.dataset.name;
                var item_price = this.dataset.price;
                var item_image = this.dataset.img;
                cart_items.push({
                    item_id: item_id,
                    item_name: item_name,
                    item_price: item_price,
                    item_image: item_image
                });
                cart_count++;
                update_cart_count(cart_count);
                this.disabled = true;
            }
            localStorage.setItem("cart_items",JSON.stringify(cart_items));
        });
        var cart_items = JSON.parse(localStorage.getItem("cart_items"));
        if(cart_items != null && cart_items.length > 0){
            var item_index = cart_items.find((obj) => obj.item_id == productlist[i].id);
            if(item_index != null){
                addbutton.disabled = true;
            }
        }
        addbutton_container.appendChild(addbutton);
    
        itemlist.appendChild(itemimage_container);
        itemlist.appendChild(itemname);
        itemlist.appendChild(itemdescription);
        itemlist.appendChild(itemprice);
        itemlist.appendChild(addbutton_container);

        fragment.appendChild(itemlist);
    }

    document.getElementById("productlist").appendChild(fragment);
    setItemPrice();
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
    console.log('done!')
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