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
    console.log(productlist.length);
/*
    for (var i = 0; i < productlist.length; i++) {
        console.log(productlist[i].id);
        console.log(productlist[i].name);
        console.log(productlist[i].default_price);
        console.log(productlist[i].description);
        console.log(productlist[i].images);
    }
*/
        /*
    if (product_items) {
        for (var i = 0; i < product_items.length; i++) {

            var itemlist = document.createElement('li'),
            itemname = document.createElement('div'),
            itemdescription= document.createElement('div'),
            itemprice = document.createElement('div'),
            itemstock = document.createElement('div'),
            addbutton_container = document.createElement('div'),
            addbutton = document.createElement('div');

            itemlist.classList.add("productitem");
        
            itemname.classList.add("itemname");
            itemname.appendChild(document.createTextNode(cart_items[i].item_name));
    
            itemprice.classList.add("itemprice");
            itemprice.appendChild(document.createTextNode(cart_items[i].item_price));
    
            removebutton_span.classList.add("removefromcart");
            removebutton.classList.add("btn_removefromcart");
    
            var itemid = document.createAttribute("data-id");
            itemid.value = cart_items[i].item_id;
            removebutton.setAttributeNode(itemid);
    
            var itemprice_d = document.createAttribute("data-price");
            itemprice_d.value = cart_items[i].item_price;
            removebutton.setAttributeNode(itemprice_d);
    

        }
        var list_container = document.getElementById("productlist");
    }
*/
/*
                <%   for (var i = 0; i < len; i++) { %>
                    <li class="productitem">
                        <div class="itemname"><%= products[i].name%></div>
                        <div class="itemdescription"><%= products[i].description%></div>
                        <div class="itemprice"><%= products[i].price%></div>
                        <div class="itemsstock"><%= products[i].stock%></div>
                        <div class="addtocart"><button class="btn_addtocart" role="button" data-name="<%=products[i].name%>" data-id="<%=products[i]._id%>" data-price="<%=products[i].price%>">Add to Cart</button></div>
                    </li>
                    <%   } %>

*/
}