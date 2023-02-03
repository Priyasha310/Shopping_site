onLoadCartNumbers();

let carts = document.querySelectorAll(".btn-cart");

let products = [
    {
        
    }
]

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener("click", ()=>{
        cartNumbers(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem("cartNumbers");
    if(productNumbers){
        document.querySelector('.fa fa-shopping-cart span').textContent = productNumbers;
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
  
    // let car tItems = localStorage.getItem('productsInCart');
    // cartItems = JSON.parse(cartItems);
  
    if (productNumbers) {
      localStorage.setItem('cartNumbers', productNumbers - 1);
      document.querySelector('.fa fa-shopping-cart span').textContent = productNumbers - 1;
    //   console.log('action running');
    }else {
      localStorage.setItem('cartNumbers', 1);
      document.querySelector('.fa fa-shopping-cart span').textContent = 1;
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    // cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    let emptycart= document.querySelector('.empty-cart');
    let cartCost = localStorage.getItem('.cart-total-price');

    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="cart-item cart-column">
                <img class="cart-item-image" src="photos/${item.imgName}" width="100" height="100">
                <span class="cart-item-title"><%= item.name %></span>
            </div>
            <span class="cart-price cart-column">&nbsp; ₹  ${ item.price} %></span>
            <div class="cart-quantity cart-column">
                <input class = "cart-item-quantity"  type = "number" value = "1">
                <button class="btn-remove"  type = "button">REMOVE</button>
                <div class="total">₹${cart-item-quantity.value*price}.</div>
            </div>`
            // `<div class="product"><ion-icon name="close-circle"></ion-icon><img src="assets/images/${item.title}.jpg" width=200px height=150px/>
            //     <span class="sm-hide">${item.title}</span>
            // </div>
            // <div class="price sm-hide">₹${item.price}.00</div>
            // <div class="quantity">
            //     <ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
            //         <span>${item.inCart}</span>
            //     <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>   
            // </div>
            // <div class="total">₹${item.inCart * item.price}.00</div>`;
        }); 

        productContainer.innerHTML += 
         `<div class = "cart-total">
            <strong class="cart-total-title">Total</strong>
            <span class="cart-total-price">₹ ${cartCost}</span>
        </div>`

        // `<div class="basketTotalContainer">
        // <h4 class="basketTotalTitle">
        //     Basket Total
        // </h4>
        // <h4 class="basketTotal">
        // ₹${cartCost}.00
        // </h4>`;
        
    }
else
    {
        emptycart.innerHTML = `
        <div id="empty-cart">
        <center>
            <img src="photos/empty.png" alt="Empty Cart! :(" width="50%" height = "40%">
            <h1>OOPS!! No Items In Cart..... :-(<br></h1>
            <span><h2>KEEP SHOPPING :-)&nbsp;
            <a href = "/"> <input class = "btn_shop" type="button" value = "+"></a>
            </h2></span>
        </center>
        </div>`

        // `<div lass="empty-cart">
        //     <h1>Cart Empty </h1>
        //     <p>You Haven t Ordered a pizza yet.  To order a pizza go to the main page.</p>  
        //     <img src="assets/images/empty-cart.png" alt="">
        // </div>`
    }
    
}