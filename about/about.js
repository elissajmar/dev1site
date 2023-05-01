 $(document).ready(function() {

  chatBot(); //run chat bot animation


  let words = document.querySelectorAll(".animationIntro");
  words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
      let span = document.createElement("span");
      span.textContent = letter;
      span.className = "letter";
      word.append(span);
    });
  });
  
  let currentWordIndex = 0;
  let maxWordIndex = words.length - 1;
  words[currentWordIndex].style.opacity = "1";
  
  function rotateText() {
    console.log(words);
    let currentWord = words[currentWordIndex];
    let nextWord =
      currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
    // rotate out letters of current word
    Array.from(currentWord.children).forEach((letter, i) => {
      setTimeout(() => {
        letter.className = "letter out";
      }, i * 50);
    });
    // reveal and rotate in letters of next word
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
      letter.className = "letter behind";
      setTimeout(() => {
        letter.className = "letter in";
      }, 340 + i * 50);
    });
    currentWordIndex =
      currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;

   };
    rotateText();
    setInterval(rotateText, 2000);

  //pulse animation
  function pulse(){
    $("#chatBot").delay(100)
      .animate({"font-size": "4.8em"})
      .animate({"font-size": "5em"})
      // .animate({"font-size": "4.8em"})
      // .animate({"font-size": "5em"});
    }

    //function that does the chat interface
    function chatBot() {
      
      $("#holdon").play();
      $("#chatBoxFlex").delay().fadeIn(100);
      $("#chatBoxFlex").animate({"height": "100px"}, 100);
      $(".one").delay(100).fadeIn();
      $(".two").delay(2000).fadeIn();
      $("#chatBoxFlex").delay(1800).animate({"height": "170px"}, 100);
      $(".three").delay(4000).fadeIn();
      $("#chatBoxFlex").delay(1800).animate({"height": "240px"}, 100);
      $(".four").delay(6000).fadeIn();
      $("#chatBoxFlex").delay(1800).animate({"height": "310px"}, 100);
      $("#chatBoxFlex").delay(1800).animate({"opacity": "0%"}, 100);

      //bag
      $("#img1").delay(8800).animate({"opacity": "100%"}, 100)
                .delay(2000).animate({"opacity": "0%"}, 100)
                
      $("#text1").delay(8800).animate({"opacity": "100%"}, 100)
                 .delay(2000).animate({"opacity": "0%"}, 100)
      
      //allison
      $("#img2").delay(11000).animate({"opacity": "100%"}, 100)
                .delay(3000).animate({"left": "100px","opacity": "30%"}, 100)
                .delay(10000).animate({"left": "0px", "opacity": "0%"}, 100)
      
      //frisbee
      $("#img3").delay(15000).animate({"opacity": "100%"}, 100)
                .delay(9000).animate({"left": "80px", "opacity": "30%"}, 300)
                .delay(7000).animate({"opacity": "0%"}, 100) //disappears
              
      $("#text2").delay(11000).animate({"opacity": "100%"}, 100)
                 .delay(8000).animate({"opacity": "30%"}, 100)
                 .delay(5000).animate({"left": "260px"}, 100)
                 .delay(7000).animate({"opacity": "0%"}, 100) //disappears

      $("#text3").delay(19000).animate({"opacity": "100%"}, 100)
                 .delay(5000).animate({"left": "260px", "opacity": "30%"}, 100)
                 .delay(7000).animate({"opacity": "0%"}, 100) //disappears

      $("#text4").delay(26000).animate({"opacity": "100%"}, 100)
                 .delay(8000).animate({"opacity": "0%"}, 100) //disappears
      $("#text5").delay(31000).animate({"opacity": "100%"}, 100)
                 .delay(4000).animate({"opacity": "0%"}, 100) //disappears

      
      $("#big").delay(36000).animate({"opacity": "100%"}, 100)
      $("#text6").delay(38000).animate({"opacity": "100%"}, 100)
    };
  
    
   
 
  //  timeline animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        pulse();
      }
      else{
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden, .hidden2");
  hiddenElements.forEach((el) => observer.observe(el));

});
