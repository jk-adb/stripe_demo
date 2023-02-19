function update_total_price(itemprice){
    var total_element = document.getElementById('totalprice');
    var total_price = total_element.textContent;
    if(!isNaN(total_price) && !isNaN(itemprice)){
        total_price = parseInt(total_price) + parseInt(itemprice);
    }
    total_element.innerHTML = total_price;

}

window.onload = function () {
    var cart_items =JSON.parse(localStorage.getItem("cart_items")),
    fragment = document.createDocumentFragment(),
    total = 0,
    element_shopping_list = document.getElementById('shopping_list'),
    element_total = document.getElementById('totalprice'),
    confirm_btn = document.getElementById('confirm');

    if (cart_items) {
        var cart_count = cart_items.length;
        for (var i = 0; i < cart_items.length; i++) {
        var itemlist = document.createElement('li'),
        itemname = document.createElement('div'),
        itemprice = document.createElement('div'),
        removebutton_span = document.createElement('span'),
        removebutton = document.createElement('button');


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

        removebutton.appendChild(document.createTextNode("Remove"));
        removebutton.addEventListener('click', function(){
            var item_index = cart_items.find((obj) => obj.item_id == this.dataset.id);
            if(item_index != null){
                var result = cart_items.filter(function( item ) {
                    return item !== item_index;
                });
                cart_count--;
                update_cart_count(cart_count);
                update_total_price(this.dataset.price*-1);

               cart_items = result;
            }
            this.closest(".productitem").remove();
            localStorage.setItem("cart_items",JSON.stringify(cart_items));
        });
        
        removebutton_span.appendChild(removebutton);
        
        itemlist.appendChild(itemname);
        itemlist.appendChild(itemprice);
        itemlist.appendChild(removebutton_span);

        fragment.appendChild(itemlist);

        var itemprice = cart_items[i].item_price;
        if(!isNaN(itemprice)){
            total = total + parseInt(itemprice);
        }
      }
    }
    element_shopping_list.appendChild(fragment);
    element_total.innerHTML = total;

    count_icon = document.getElementById('count'),
    clicked = [],
    cart_count = 0;

    cart_items =JSON.parse(localStorage.getItem("cart_items"));
    console.log(cart_items);
    console.log(cart_items.length);
    if(cart_items.length > 0){
        cart_count = cart_items.length;
        count_icon.innerHTML = cart_count;
        count_icon.parentNode.classList.remove('hidden');
        clicked = cart_items;
    }

    var checkout_btn = document.getElementById('checkout');
    if(checkout_btn){
        checkout_btn.addEventListener('click',function () {
            window.location.href = "/checkout";
        });    
    }
  
  };