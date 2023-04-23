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
        console.log(id)

        code = "<div class='editProduct'> <input id='newquantity' type='number' min='1' max='2'> <div class='save'>Save</div> </div>"
        
        $(this).parent().append(code)
        $(this).css("display", "none") //hides edit prompt
        
    }) 

    // CURRENTLY NOT WORKING
    $(".save").click(function() { 
        console.log("clicked")
        newQuantity = $(this).siblings("input").val()
        cart[id].quantity = newQuantity;

        setCart(cart)
        reload()
    })

    $("#applyPromo").click(function() {
        applyPromo(cart)

        $("#promoSummary").append("BAG20")
    })

    function applyPromo(cart){
        totalPrice = calculateTotal(cart); 
        if ($("#promoCode").val().toUpperCase() == "BAG20"){
            totalPrice -= totalPrice * 0.20 
        }

        printCart(cart, totalPrice)
    }


})