
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else{
    ready();
}

function ready(){
    
    // updateCartTotal();

    var removeCartItemButtons = document.getElementsByClassName("btn-remove");
    for(var i=0; i<removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("cart-item-quantity");
    for(var i=0; i<quantityInputs.length; i++){
        var button = quantityInputs[i];
        button.addEventListener("change", quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName("shop-item-button");
    for(var i=0; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked);
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);

}

function purchaseClicked(){
    var cartItems = document.getElementsByClassName("cart-items")[0];

    // if(cartItems.hasChildNode())
        alert("Thank you for your purchase!");
    // else
        // alert("⚠️ Please choose items to purchase!");

    while(cartItems.hasChildNode()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
    // cartNumbers();
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement("div");
    cartRow.innerText = title;
    // var cartItems = document.getElementsByClassName("cart-items")[0];    
    // cartItems.append(cartRow);
    // cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title){
            alert("Item already added to cart!");
            return;
        }    
    }

    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">"${title}"</span>
    </div>
    <span class="cart-price cart-column">&nbsp; "${price}"</span>
    <div class="cart-quantity cart-column">
        <input class = "cart-item-quantity"  type = "number" value = "1">
        <button class="btn-remove"  type = "button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName("cart-item-quantity")[0].addEventListener("change", quantityChanged);
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var total = 0;
    for(var i=0; i<cartRows.length; i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement = cartRow.getElementsByClassName("cart-item-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("₹", ""));
        var quantity = quantityElement.value;
        total = total + (price*quantity);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName("cart-total-price")[0].innerText = "₹ " + total;
    // cartNumbers();
}

