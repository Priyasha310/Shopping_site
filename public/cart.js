if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
var cartItems = [];

function ready() {
    // updateCartTotal();

    cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems == null) {
        cartItems = [];
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    console.log("Initial Cart on Load: ", cartItems);

    var removeCartItemButtons = document.getElementsByClassName("btn-remove");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-item-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var button = quantityInputs[i];
        button.addEventListener("change", quantityChanged);
    }

    var addToCartButtons = document.getElementsByClassName("shop-item-button");
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked);
    }
    if (window.location.pathname == "/cart") {
        document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
    }
}

function purchaseClicked(event) {
    var cartItemsDiv = document.getElementsByClassName("cart-items")[0];
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems.length > 0) {
        alert("Thank you for your purchase of " + cartItems.length + " items. Total amount: " + localStorage.getItem("total") + "");
        cartItems = [];
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        cartItemsDiv.innerHTML = "";
        updateCartTotal();
    } else {
        alert("⚠️ Please choose items to purchase!");
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));

    var title = buttonClicked.parentElement.parentElement.getElementsByClassName("cart-item-title")[0].innerText;
    title = title.replaceAll('"', "");
    // console.log("parent title", title);
    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].title == title) {
            cartItems.splice(i, 1);
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            console.log("Updated cart (removed) : ", cartItems);
        }
    }
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var title = input.parentElement.parentElement.getElementsByClassName("cart-item-title")[0].innerText;
    title = title.replaceAll('"', "");
    // console.log("parent title", title);

    for (var i = 0; i < cartItems.length; i++) {
        if (cartItems[i].title == title) {
            cartItems[i].quantity = input.value;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            console.log("Updated cart (quantity changed) : ", cartItems);
        }
    }

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    //console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
    // cartNumbers();
    updateCartTotal();
}

// use localstorage to add the item to the cart
function addItemToCart(title, price, imageSrc, quantity = 1) {
    var alreadyInCart = false;
    //check if item is present in the cart
    var cartItemsOld = JSON.parse(localStorage.getItem("cartItems"));
    //console.log("cart items old: ", cartItemsOld);
    if (cartItemsOld != null && cartItemsOld.length > 0) {
        for (var i = 0; i < cartItemsOld.length; i++) {
            if (cartItemsOld[i].title == title) {
                alert("Item already in cart! Increasing quantity by one.");
                cartItemsOld[i].quantity += 1;
                localStorage.setItem("cartItems", JSON.stringify(cartItemsOld));
                alreadyInCart = true;
                return;
            }
        }
    }
    if (alreadyInCart == false) {
        cartItems.push({ title, price, imageSrc, quantity });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log("Updated cart: ", cartItems);

        //do the dom manipulation after this to add the item to the cart
    }
}

if (window.location.pathname == "/cart") {
    //do stuff
    console.log("in cart.html");
    addCartItemsToDOM();
}

function addCartItemsToDOM() {
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    // console.log("cart items: ", cartItems);

    for (var i = 0; i < cartItems.length; i++) {
        var title = cartItems[i].title;
        var price = cartItems[i].price;
        var imageSrc = cartItems[i].imageSrc;
        var quantity = cartItems[i].quantity;
        // console.log(title, price, imageSrc, quantity);
        addCartItemsDivs(title, price, imageSrc, quantity);
    }
    updateCartTotal();
}
function addCartItemsDivs(title, price, imageSrc, quantity) {
    var cartRow = document.createElement("div");
    cartRow.innerText = title;
    cartRow.classList.add("cart-row");

    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">&nbsp; ${price}</span>
        <div class="cart-quantity cart-column">
            <input class = "cart-item-quantity"  type = "number" value = ${quantity}>
            <button class="btn-remove"  type = "button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.appendChild(cartRow);
    cartRow.getElementsByClassName("btn-remove")[0].addEventListener("click", removeCartItem);
    cartRow.getElementsByClassName("cart-item-quantity")[0].addEventListener("change", quantityChanged);
}

function updateCartTotal() {
    var total = 0;
    var cartItems = JSON.parse(localStorage.getItem("cartItems"));
    for (var i = 0; i < cartItems.length; i++) {
        var price = cartItems[i].price;
        price = price.replace("₹", "");
        var quantity = cartItems[i].quantity;
        total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    console.log("total: ", total);
    if (window.location.pathname == "/cart") {
        document.getElementsByClassName("cart-total-price")[0].innerText = "₹ " + total;
    }
    localStorage.setItem("total", total);
    // cartNumbers();
}

var wishlistButtons = document.getElementsByClassName("heart");

for(var i=0; i<wishlistButtons.length; i++){
    var button = wishlistButtons[i];
    button.addEventListener("click", function(event){
        var buttonClicked = event.target;
        buttonClicked.style.color = "red";
    })
}

var cartButtons= document.getElementsByClassName("btn-cart");

for(var i=0; i<cartButtons.length; i++){
    var button = cartButtons[i];
    button.addEventListener("click", function(event){
        var buttonClicked = event.target;
        buttonClicked.innerText = "ADDED TO CART!";
        buttonClicked.style.backgroundColor = "antiquewhite";
    })
}
