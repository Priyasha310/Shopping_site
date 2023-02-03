// const { LongWithoutOverridesClass } = require("bson");

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else{
    ready();
}

function ready(){
    
    // updateCartTotal();
    // displayCart();

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
    cartNumbers();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    cartNumbers();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
    cartNumbers();
}

function addToCartClicked(event){
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
    cartNumbers();
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc){
    var cartRow = document.createElement("div");
    cartRow.innerText = title;
    var cartItems = document.getElementsByClassName("cart-items");    
    cartItems.append(cartRow);
    // cartRow.classList.add("cart-row");
    // var cartItems = document.getElementsByClassName("cart-items")[0];
    // var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    // for (var i = 0; i < cartItemNames.length; i++) {
    //     if(cartItemNames[i].innerText == title){
    //         alert("Item already added to cart!");
    //         return;
    //     }    
    // }

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
    cartNumbers();
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
  
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
  
    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers - 1);
      document.querySelector('.fa fa-shopping-cart span').textContent = productNumbers - 1;
      console.log('action running');
    }else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.fa fa-shopping-cart span').textContent = 1;
    }
}

// Product page
var wishlistButtons = document.getElementsByClassName("heart");

for(var i=0; i<wishlistButtons.length; i++){
    var button = wishlistButtons[i];
    button.addEventListener("click", function(event){
        var buttonClicked = event.target;
        buttonClicked.style.color = "red";
    })
}

var cartButtons = document.getElementsByClassName("btn-cart");

for(var i=0; i<cartButtons.length; i++){
    var button = cartButtons[i];
    button.addEventListener("click", function(event){
        var buttonClicked = event.target;
        buttonClicked.style.backgroundColor = "antiquewhite";
        buttonClicked.innerText = "ADDED TO CART";
    })
}

// function displayCart() {
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     let cart = localStorage.getItem("totalCost");
//     // cart = parseInt(cart);

//     let productContainer = document.querySelector('.products');
//     let emptycart= document.querySelector('.empty-cart');
//     let cartCost = localStorage.getItem('.cart-total-price');

    
//     if( cartItems && productContainer ) {
//         productContainer.innerHTML = '';
//         Object.values(cartItems).map( (item, index) => {
//             productContainer.innerHTML += 
//             `<div class="cart-item cart-column">
//                 <img class="cart-item-image" src="photos/${item.imgName}" width="100" height="100">
//                 <span class="cart-item-title"><%= item.name %></span>
//             </div>
//             <span class="cart-price cart-column">&nbsp; ₹  ${ item.price} %></span>
//             <div class="cart-quantity cart-column">
//                 <input class = "cart-item-quantity"  type = "number" value = "1">
//                 <button class="btn-remove"  type = "button">REMOVE</button>
//                 <div class="total">₹${cart-item-quantity.value*price}.</div>
//             </div>`
//             // `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="assets/images/${item.title}.jpg" width=200px height=150px/>
//             //     <span class="sm-hide">${item.title}</span>
//             // </div>
//             // <div class="price sm-hide">₹${item.price}.00</div>
//             // <div class="quantity">
//             //     <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
//             //         <span>${item.inCart}</span>
//             //     <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
//             // </div>
//             // <div class="total">₹${item.inCart * item.price}.00</div>`;
//         }); 

//         productContainer.innerHTML += 
//          `<div class = "cart-total">
//             <strong class="cart-total-title">Total</strong>
//             <span class="cart-total-price">₹ ${cartCost}</span>
//         </div>`

//         // `<div class="basketTotalContainer">
//         // <h4 class="basketTotalTitle">
//         //     Basket Total
//         // </h4>
//         // <h4 class="basketTotal">
//         // ₹${cartCost}.00
//         // </h4>`;
        
//     }
// else
//     {
//       emptycart.innerHTML = `
//         <div id="empty-cart">
//         <center>
//             <img src="photos/empty.png" alt="Empty Cart! :(" width="50%" height = "40%">
//             <h1>OOPS!! No Items In Cart..... :-(<br></h1>
//             <span><h2>KEEP SHOPPING :-)&nbsp;
//             <a href = "/"> <input class = "btn_shop" type="button" value = "+"></a>
//             </h2></span>
//         </center>
//         </div>`

//         // `<div lass="empty-cart">
//         //     <h1>Cart Empty </h1>
//         //     <p>You Haven t Ordered a pizza yet.  To order a pizza go to the main page.</p>  
//         //     <img src="assets/images/empty-cart.png" alt="">
//         // </div>`
//     }
//     updateCartTotal();
//     purchaseClicked();
//     quantityChanged();
// }