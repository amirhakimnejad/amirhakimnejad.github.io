// Change style of navbar on scroll
window.onscroll = function() {scrollFunction()};
function scrollFunction()
{
  if (document.body.scrollTop > 260 || document.documentElement.scrollTop > 260)
    document.getElementById("nav-bar").style.opacity = "0.5";
  else
    document.getElementById("nav-bar").style.opacity = "1";
}

  /*Scroll transition to anchor*/
$(document).ready(function(){
// Add smooth scrolling to all links
  $("a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
  } else {
      x.className = x.className.replace(" w3-show", "");
  }
}

//Project fetcher
function callGitHub() {
  let xhttp = new XMLHttpRequest();
  document.getElementById('fetcher').innerHTML = 'Fetching'
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      let obj = JSON.parse(this.responseText);
      projectPublisher(obj);
    }
  };
  xhttp.open("GET", "https://api.github.com/users/amirhakimnejad/repos", true);
  xhttp.send();
}

function projectPublisher(obje) {
  document.getElementById('prdiv').innerHTML = ''
  document.getElementById('fetcher').innerHTML = 'Fetch again?'
  for(let i = 0; i < Object.keys(obje).length; i++)
  {
    document.getElementById('prdiv').innerHTML += '<div class="project"><strong>Title: <a href="' + obje[i].html_url + '" target="_blank">' + obje[i].name + '</a><br>Main Lang: ' + obje[i].language + '</strong><br>' + obje[i].description + '</div>';
  }
}
