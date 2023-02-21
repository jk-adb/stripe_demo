var count_icon = document.getElementById('count');
const cart_item_name = "cart_items";

function update_cart_count(count){
    var count_element = document.getElementById('count');
    if( count > 0 ){
        count_element.parentNode.classList.remove('hidden');
    }else{
        count_element.parentNode.classList.add('hidden');
    }
    count_element.innerHTML = count;
}

function initialize_cart(){
    update_cart_count(0);
    localStorage.removeItem("cart_items");
    count_icon.parentNode.classList.add("hidden");
}

window.onload = function(){
    var cart_btns = document.querySelectorAll('.btn_addtocart'),
    count_icon = document.getElementById('count'),
    cart_items =[],
    cart_count = 0;

    cart_items = JSON.parse(localStorage.getItem(cart_item_name));
    if(cart_items != null && cart_items.length > 0){
        cart_count = cart_items.length;
        count_icon.innerHTML = cart_count;
        count_icon.parentNode.classList.remove('hidden');
    }

    cart_btns.forEach(function (cart_btn, index){
        cart_btn.addEventListener('click', function(){
            var additem = true;
            if(cart_items != null && cart_items.length > 0){
                var item_index = cart_items.find((obj) => obj.item_id == cart_btn.dataset.id);
                if(item_index != null){
                    additem = false;
                }
            }else{
                cart_items = [];
            }
            if(additem){
                var item_id = cart_btn.dataset.id;
                var item_name = cart_btn.dataset.name;
                var item_price = cart_btn.dataset.price;
                cart_items.push({
                    item_id: item_id,
                    item_name: item_name,
                    item_price: item_price
                });
                cart_count++;
                update_cart_count(cart_count);
            }
            localStorage.setItem(cart_item_name,JSON.stringify(cart_items));
        });
    });
}
