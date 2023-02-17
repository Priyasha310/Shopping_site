if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else{
    ready();
}

let products = [
    {
        "id": 1,
        "name": "Casual T-shirt",
        "price": 199,
        "imgName": "tshirt.jpg",
        "inCart": 0
    },
    {
        "id": 2,
        "name": "Wide Leg Jeans",
        "price": 999,
        "imgName": "jeans.jpg",
        "inCart": 0
    },
    {
        "id": 3,
        "name": "Kurti and Leggings",
        "price": 1299,
        "imgName": "kurti.jpg",
        "inCart": 0
    },
    {
        "id": 4,
        "name": "Floral Saree",
        "price": 1499,
        "imgName": "saree.jpg",
        "inCart": 0
    },
    {
        "id": 5,
        "name": "Ritu Lehenga",
        "price": 2999,
        "imgName": "lehenga.jpg",
        "inCart": 0
    },
    {
        "id": 6,
        "name": "Brown Leather Dress",
        "price": 3599,
        "imgName": "leather.jpg",
        "inCart": 0
    },
    {
        "id": 7,
        "name": "Shirt Dress",
        "price": 1199,
        "imgName": "shirt_dress.webp",
        "inCart": 0
    },
    {
        "id": 8,
        "name": "Cowl Neck Top",
        "price": 1049,
        "imgName": "cowled_neck.webp",
        "inCart": 0
    },
    {
        "id": 9,
        "name": "Peach Hoodie",
        "price": 1199,
        "imgName": "h1.webp",
        "inCart": 0
    },
    {
        "id": 10,
        "name": "Mustard Hoodie",
        "price": 599,
        "imgName": "h2.webp",
        "inCart": 0
    },
    {
        "id": 11,
        "name": "Typography Hoodie",
        "price": 699,
        "imgName": "h3.jpg",
        "inCart": 0
    },
    {
        "id": 12,
        "name": "Brown Hoodie",
        "price": 1049,
        "imgName": "h4.webp",
        "inCart": 0
    },
    {
        "id": 13,
        "name": "Green Hoodie",
        "price": 649,
        "imgName": "h5.jpg",
        "inCart": 0
    },
    {
        "id": 14,
        "name": "Yellow Sweatshirt",
        "price": 1049,
        "imgName": "h6.jpg",
        "inCart": 0
    },
    {
        "id": 15,
        "name": "Striped Sweatshirt",
        "price": 1149,
        "imgName": "h7.jfif",
        "inCart": 0
    },
    {
        "id": 16,
        "name": "Woven Sweater",
        "price": 1049,
        "imgName": "h8.webp",
        "inCart": 0
    },
    {
        "id": 17,
        "name": "Cocktail Dress",
        "price": 2499,
        "imgName": "d1.jpg",
        "inCart": 0
    },
    {
        "id": 18,
        "name": "Pink Bodycon Dress",
        "price": 799,
        "imgName": "d2.jpg",
        "inCart": 0
    },
    {
        "id": 19,
        "name": "Green Dress",
        "price": 699,
        "imgName": "d3.webp",
        "inCart": 0
    },
    {
        "id": 20,
        "name": "A-line Dress",
        "price": 499,
        "imgName": "d4.jpg",
        "inCart": 0
    },
    {
        "id": 21,
        "name": "Cocktail Dress",
        "price": 1449,
        "imgName": "d5.jpg",
        "inCart": 0
    },
    {
        "id": 22,
        "name": "Sequined Dress",
        "price": 999,
        "imgName": "d6.jpg",
        "inCart": 0
    },
    {
        "id": 23,
        "name": "Bodycon Maxi Dress",
        "price": 749,
        "imgName": "d7.webp",
        "inCart": 0
    },
    {
        "id": 24,
        "name": "Party Dress",
        "price": 1599,
        "imgName": "d8.webp",
        "inCart": 0
    }
];

function ready(){
    
    setCartCount();
    displayCart();

    products.forEach(product => {
        let button = document.getElementById(`btn-cart-${product.id}`);
        if(button){          
            // button.addEventListener("click", function(event){
            //     var buttonClicked = event.target;
            //     buttonClicked.innerText = "ADDED TO CART";
            // })
            button.addEventListener("click", function() {
                let item = { ...product, [product.id] : product};
            
                cartNumbers(item);
                totalCost(item);
                // console.log("added");
            });
        }
    });

    var removeCartItemButtons = document.getElementsByClassName("btn-remove");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // var quantityInputs = document.getElementsByClassName("cart-item-quantity");
    // for (var i = 0; i < quantityInputs.length; i++) {
    //     var button = quantityInputs[i];
    //     button.addEventListener("change", quantityChanged);
    // }

    if (window.location.pathname == "/cart") {
        document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
    }

}

//cart page
function setCartCount(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.getElementById('cart-count').textContent = " " + productNumbers;
    } 
}

function cartNumbers(product) {
    console.log("the product clicked is ", product);

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
  
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        console.log('action running');
    }else {
        localStorage.setItem('cartNumbers', 1);
    }

    setItems(product);    
    
    let updatedcartNumber = localStorage.getItem("cartNumbers");
    console.log("Total no. of cart Product: ", updatedcartNumber);
}

function setItems(product){
    console.log("under setItems");

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.id] == undefined){
            cartItems = {
                ...cartItems, 
                [product.id]: product
            }
        }
        cartItems[product.id].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.id] : product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    console.log("Product is: ", cartItems);
}

function totalCost(product){

    let cartCost = localStorage.getItem("totalCost");

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }

    let updatedCost = localStorage.getItem("totalCost");
    console.log("Total Cart Cost: ", updatedCost);
}

function displayCart() {
    console.log("displaying cart");

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);

    let cartCost = localStorage.getItem("totalCost");
    cartCost = parseInt(cartCost);

    let productContainer = document.querySelector('.cart-items');
    // let productContainer = document.querySelector('non-empty');
    // let emptycart= document.querySelector('#empty-cart');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map (item  => {
            productContainer.innerHTML += 
            `<div class = "cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="photos/${item.imgName}" width="100" height="100">
                    <span class="cart-item-title">${item.name} </span>
                </div>
                <span class="cart-price cart-column">&nbsp; ₹  ${ item.price} </span>
                <div class="cart-quantity cart-column">
                    <input class = "cart-item-quantity"  type = "number" value = ${item.inCart}>
                    <button id="btn-remove-cart-${item.id}" class="btn-remove"  type = "button">REMOVE</button>
                </div>
            </div>`
        }); 

        productContainer.innerHTML += 
        `<div class = "cart-total">
            <strong class="cart-total-title">Total</strong>
            <span class="cart-total-price">₹ ${cartCost}</span>
        </div>`

    }
    // else{
    //     emptycart.innerHTML = ``
    //     emptycart.innerHTML += `
    //     <div id="empty-cart">
    //     <center>
    //         <img src="photos/empty.png" alt="Empty Cart! :(" width="50%" height = "40%">
    //         <h1>OOPS!! No Items In Cart..... :-(<br></h1>
    //         <span><h2>KEEP SHOPPING :-)&nbsp;
    //         <a href = "/"> <input class = "btn_shop" type="button" value = "+"></a>
    //         </h2></span>
    //     </center>
    //     </div>`  
    // }   
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartItems = JSON.parse(localStorage.getItem("productsInCart"));

    var title = buttonClicked.parentElement.parentElement.getElementsByClassName("cart-item-title")[0].innerText;
    // var image = buttonClicked.parentElement.parentElement.getElementsByClassName("cart-item-image")[0].src;
    // var price = buttonClicked.parentElement.parentElement.getElementsByClassName("cart-item-price")[0].innerText;
    console.log("title", title);
    title = title.replaceAll('"', "");
    // price = price.replaceAll('"', "");
    // image = image.replaceAll('"', "");

    // console.log("parent title", title);
    for (var i = 0; i < cartItems.length; i++) {
        console.log(cartItems[i]);
        if (productsInCart[i].name === title) {
            productsInCart.splice(i, 1);
            localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
            console.log("Updated cart (removed) : ", cartItems[i].name);
        }
    }
    buttonClicked.parentElement.parentElement.remove();
    // totalCost();
}

function purchaseClicked(event) {
    var cartItemsDiv = document.getElementsByClassName("cart-items")[0];
    var cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    console.log( cartItems);
    if (cartItems.length > 0) {
        alert("Thank you for your purchase of " + cartItems.length + " items. Total amount: " + localStorage.getItem("total") + "");
        cartItems = [];
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        cartItemsDiv.innerHTML = "";
        totalCost();
    } else {
        alert("⚠️ Please choose items to purchase!");
    }
}
