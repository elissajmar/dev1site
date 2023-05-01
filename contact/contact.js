$(document).ready(function(){

   
    $("#submit").click(function() {
       

        if ($("input").val() == ""){
              $("input").css("border", "2px solid red"); 
              alert("Please fill out empty boxes!")
        }else{
            location.reload()
            alert("Submitted! Thank you for your message, our team will get back to you in 48 hours.")
        }
    })


    

})