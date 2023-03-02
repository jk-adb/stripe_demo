function update_total_price(itemprice){
    var total_element = document.getElementById('totalprice');
    var total_price = total_element.textContent;
    if(!isNaN(total_price) && !isNaN(itemprice)){
        total_price = parseInt(total_price) + parseInt(itemprice);
        if(!total_price > 0){
            disableCheckout();
        }
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
        var item_DOM = "<li class='productitem'>" +
        "<div class='itemname'>" + cart_items[i].item_name + "</div>" +
        "<div class='itemprice'>" + cart_items[i].item_price + "</div>" +
        "<div class='itemimage'>"+
            "<img src='" + cart_items[i].item_image + "'/>" +
        "</div>"+
        "<span class='removefromcart'>" +
            "<button class='btn_removefromcart' id='btn_removefromcart_" + cart_items[i].item_id + "'" +
            " data-id='" + cart_items[i].item_id + "'" +
            " data-price='" + cart_items[i].item_price + "'>" +
            "Remove" +
            "</button>" +
        "</span>" +
        "</li>";

        document.getElementById("shopping_list").insertAdjacentHTML("beforeend", item_DOM);

        var removebutton = document.getElementById("btn_removefromcart_" + cart_items[i].item_id);
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


        var itemprice = cart_items[i].item_price;
        if(!isNaN(itemprice)){
            total = total + parseInt(itemprice);
        }
      }
    }
//    element_shopping_list.appendChild(fragment);
    element_total.innerHTML = total;
    if(!total > 0){
        disableCheckout();
    }

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

  function disableCheckout(){
    const checkout_button = document.getElementById("checkout");
    if(checkout_button) checkout_button.setAttribute("disabled", true);
  }