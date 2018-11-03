document.addEventListener("DOMContentLoaded", function(){

  function getElementY(query) {
    return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
  }

  function doScrolling(element, duration) {
  	var startingY = window.pageYOffset
    var elementY = getElementY(element)

    // If element is close to page's bottom then window will scroll only to some position above the element.
    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
  	var diff = targetY - startingY

    // Easing function: easeInOutCubic
    // From: https://gist.github.com/gre/1650294
    var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
    var start

    if (!diff) return

  	// Bootstrap our animation - it will get called right before next frame shall be rendered.
  	window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp

      // Elapsed miliseconds since start of scrolling.
      var time = timestamp - start

  		// Get percent of completion in range [0, 1].
      var percent = Math.min(time / duration, 1)

      // Apply the easing.
      // It can cause bad-looking slow frames in browser performance tool, so be careful.
      percent = easing(percent)

      window.scrollTo(0, startingY + diff * percent)

  		// Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    })
  }

  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      slideIndex = 1
    }

    if (n < 1) {
      slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");

    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

  // array with texts to type in typewriter
  var dataText = [ "Use your command line to<br/> organize your cloud faster."];

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
      if(text.substring(i,i+5)==="<br/>"){
        i = i + 5;
      }else{
       document.querySelector(".subt").innerHTML = text.substring(0, i+1) +'<span class="cur" aria-hidden="true"></span>';
      }

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1)
      }, 100);
    }
  }

  typeWriter(dataText[0], 0);

  document.getElementsByClassName("first_section")[0].addEventListener("click", doScrolling.bind(null, "#info", 1000));
  document.getElementsByClassName("second_section")[0].addEventListener("click", doScrolling.bind(null, ".source", 1000));
  document.getElementsByClassName("fa-arrow-down")[0].addEventListener("click", doScrolling.bind(null, ".source", 1000));
  document.getElementsByClassName("third_section")[0].addEventListener("click", doScrolling.bind(null, "#documentation", 1000));

  document.getElementsByClassName("prev")[0].addEventListener("click", plusSlides.bind(null, -1));
  document.getElementsByClassName("next")[0].addEventListener("click", plusSlides.bind(null, 1));
  document.getElementsByClassName("dot")[0].addEventListener("click", currentSlide.bind(null, 1));
  document.getElementsByClassName("dot")[1].addEventListener("click", currentSlide.bind(null, 2));
  document.getElementsByClassName("dot")[2].addEventListener("click", currentSlide.bind(null, 3));

  document.getElementsByClassName("fa-windows")[0].addEventListener("click", function(event){
    document.getElementsByTagName("code")[0].innerHTML = '<span class="nb">iex</span> <span class="o">(</span><span class="nb">new-object </span>net.webclient<span class="o">)</span>.downloadstring<span class="o">(</span><span class="s1">\'https://raw.githubusercontent.com/PanSem/onedrivecli/master/require_lib.py\'</span><span class="o">)</span>'
  });

  document.getElementsByClassName("fa-linux")[0].addEventListener("click", function(event){
    document.getElementsByTagName("code")[0].innerHTML = "Coming Soon"
  });
});
