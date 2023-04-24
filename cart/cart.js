$(document).ready(function(){
    
    cart = getCart(); 
    totalPrice = calculateTotal(cart)
    printCart(cart, totalPrice)

    function getCart(){ // gets cart from localStorage and parses it
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        else {
            cart = []
        }
        return cart
    }

    function setCart (cart){ // stores cart in localStorage 
        localStorage.setItem("cart", JSON.stringify(cart))
    }


    function calculateTotal(cart){
        totalPrice = 0
        for (i=0; i<cart.length; i++){
            productQuantity = cart[i].quantity
            productPrice = cart[i].price

            totalPrice += parseFloat(productQuantity) * parseFloat(productPrice)
        }

        return totalPrice
    }

    function printCart(cart, totalPrice) { 
        $(".cart").html("")

        if (cart.length == 0){
            $(".cart").append("Looks like your cart is empty!")
        }

        for (i=0; i<cart.length; i++){
            productQuantity = cart[i].quantity
            productName = cart[i].name
            productPrice = cart[i].price

            code = "<div class='cartProduct' id='" + cart[i].id + "'>" 
            code +=     "<div class='cartImage'> <img src='../home/assets/bag.png' alt='blue bag'> </div>"
            code +=     "<div class='cartInfo'>"
            code +=         "<div class='productName'><strong>" + productName + "</strong></div>"
            code +=         "<div class='productPrice'> $" + productPrice + "</div>"
            code +=         "<div class='productQuantity'> Quantity: " + productQuantity + "</div>" 
            code +=         "<button class='edit'> Edit </button>"
            code +=         "<div class='editProduct'> <input id='newquantity' type='number' min='1' max='10'> <div class='save'> Save </div> </div>"
            code +=     "</div>"
            code+="</div>"

            $(".cart").append(code)
        }

        $(".priceTotal").html("Total: $" + totalPrice)
    }

    //when edit button is clicked
    //figure out what cart item it's being clicked for
    //fetch the quantity 
    //replace quantity display with an input box
    //save user inputted value
    //update local storage 

    $(".edit").click(function() {
        id = $(this).parent().parent().attr("id")
        //console.log(id) //testing

        $(this).siblings(".editProduct").css("display", "flex") //show edit box
        $(this).css("display", "none") //hides edit prompt
        
    }) 

    $(".save").click(function() { 
        newQuantity = $(this).siblings("input").val() //gets the new quantity from the value of the input
        cart[id].quantity = newQuantity; //sets new quantity for product

        setCart(cart) //stores in local storate
        location.reload() //reload page to reprint updated cart
    })


    $("#applyPromo").click(function() {
        applyPromo(cart)

        $("#promoSummary").append("BAG20") //add promo code to cart summary
    })

    function applyPromo(cart){
        totalPrice = calculateTotal(cart); 
        if ($("#promoCode").val().toUpperCase() == "BAG20"){
            totalPrice -= totalPrice * 0.20 
        }

        printCart(cart, totalPrice)
    }


    // PAY WITH VENMO
    $(".link").click(function(){
        window.open(
            "https://venmo.com", 
            '_blank' //new tab
        );
    })


})