$(document).ready(function(){
    //PRODUCT IMAGE GALLERIES
    var imgs = document.querySelectorAll('.slider img');
    var dots = document.querySelectorAll('.dot');
    var currentImg = 0; // index of the first image 
    const interval = 3000; // duration(speed) of the slide
    
    function changeSlide(n) {
        for (var i = 0; i < imgs.length; i++) { // reset
        imgs[i].style.opacity = 0;
        dots[i].className = 'dots';
        }
    
        currentImg = n;
    
        imgs[currentImg].style.opacity = 1;
        dots[currentImg].className += ' active';
    }

    /* CART FUNCTIONALITY */
    //localStorage.clear()

    /* DEFINING PRODUCTS */
    let topBag = { //defines the template for a product with name, price, and quantity
        "name": "The Top Bag",
        "price": 49.99,
    }

    let bottomBag = {
        "name": "The Bottom Bag",
        "price": 49.99,
    }

    //on add to cart button click, call add to cart for that specific product
    $(".addtocartTop").click(function(){
        quantity = $("#quantityTop").val()
        if (quantity != ""){ //make sure input isn't blank
            addToCart(topBag, quantity)
            $(this).siblings(".addedAlert").css("display", "block")

            $(".cartSidebar").css("display", "flex")
            printCart(cart)
            console.log(cart) //to check
        }
        else {
            alert("Please enter a valid quantity!")
        }

    })

    $(".addtocartBottom").click(function(){
        quantity = $("#quantityBottom").val()
        if (quantity != ""){ //make sure input isn't blank
            addToCart(bottomBag, quantity)
            $(this).siblings(".addedAlert").css("display", "block")

            $(".cartSidebar").css("display", "flex")
            printCart(cart)
            console.log(cart) //to check
        }

        else {
            alert("Please enter a valid quantity!")
        }
    })


    /* FUNCTIONS */
    function setCart (cart){ // stores cart in localStorage 
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    function getCart(){ // gets cart from localStorage and parses it
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        else {
            cart = []
        }
        return cart
    }

    function addToCart(product, quantity){ //where productName is an object 
        cart = getCart() //get the cart
        quantity = parseFloat(quantity) //make sure quantity is a number

        if (cart.length == 0 ){ //check if cart length is 0, then autoadd 
            console.log("zero")
            product.quantity = quantity;
            product.id = cart.length; //set an id for the product (for later editing reference)
            cart.push(product)
        }

        else {
            added = false;

            //check if cart already has product
            for (i=0; i<cart.length; i++){   //for the length of the cart
                if (cart[i].name == product.name){ //if theres a product in the cart already that matches 
                    cart[i].quantity = parseFloat(cart[i].quantity) + quantity; //increment the quantity
                    added = true;
                }
            }

            if (added == false){ //if no match was found
                product.quantity = quantity; //add a new product to the cart
                product.id = cart.length;
                cart.push(product)
            }
        }
        
        setCart(cart) //stores cart in storage
    }

    function clearCart(){ //restarts the cart
        cart = getCart()
        cart = []
        setCart(cart)
    }

    function printCart(cart) { 
        $(".cartSidebar").html("<h3>CART</h3>")

        if (cart.length == 0){
            $(".cartSidebar").append("Looks like your cart is empty!")
        }

        for (i=0; i<cart.length; i++){
            productQuantity = cart[i].quantity
            productName = cart[i].name
            productPrice = cart[i].price

            code = "<div class='cartProduct' id='" + cart[i].id + "'>" 
            code +=     "<div class='cartInfo'>"
            code +=         "<div class='productName'><strong>" + productName + "</strong></div>"
            code +=         "<div class='productPrice'> $" + productPrice + "</div>"
            code +=         "<div class='productQuantity'> Quantity: " + productQuantity + "</div>" 
            code +=     "</div>"
            code+="</div>"

            $(".cartSidebar").append(code)
        }

        $(".cartSidebar").append("<div class='button white'><a href='../cart/cart.html'>CHECKOUT<a></div>")
        
    }
    

})