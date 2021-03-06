/* Template Name: Zorial - Responsive Bootstrap 4 Landing Page Template
    Author: Themesdesign
    Version: 1.0.0
    Created: Jan 2020
    File Description: Main js file*/

// STICKY
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 50) {
    $(".sticky").addClass("nav-sticky");
  } else {
    $(".sticky").removeClass("nav-sticky");
  }
});

// SmoothLink
$(".nav-item a, .mouse-down a").on("click", function (event) {
  var $anchor = $(this);
  $("html, body")
    .stop()
    .animate(
      {
        scrollTop: $($anchor.attr("href")).offset().top - 0,
      },
      1500,
      "easeInOutExpo"
    );
  event.preventDefault();
});

// light/dark mode button
$("#mode").on("click", function (event) {
  var currentMode = $(event.currentTarget).attr("mode");
  if (currentMode == "light") {
    $("#app-css").attr("href", "css/style-dark.css");
    $("#mode").attr("mode", "dark");
  } else {
    $("#app-css").attr("href", "css/style.css");
    $("#mode").attr("mode", "light");
  }
});

//Scrollspy
$(".navbar-nav").scrollspy({
  offset: 70,
});

function initScrollspy() {
  $("#navbarCollapse").scrollspy({
    offset: 20,
  });
}

// STICKY BUTTON
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 50) {
    $(".nav-btn").addClass("active");
  } else {
    $(".nav-btn").removeClass("active");
  }
});

// owl carousel

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 30,
  nav: false,
  autoplay: true,
  autoplay: 3000,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

// Contact Form
function validateForm() {
  var name = document.forms["myForm"]["name"].value;
  var email = document.forms["myForm"]["email"].value;
  var subject = document.forms["myForm"]["subject"].value;
  var comments = document.forms["myForm"]["comments"].value;
  document.getElementById("error-msg").style.opacity = 0;
  document.getElementById("error-msg").innerHTML = "";
  if (name == "" || name == null) {
    document.getElementById("error-msg").innerHTML =
      "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
    fadeIn();
    return false;
  }
  if (email == "" || email == null) {
    document.getElementById("error-msg").innerHTML =
      "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
    fadeIn();
    return false;
  }
  if (subject == "" || subject == null) {
    document.getElementById("error-msg").innerHTML =
      "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
    fadeIn();
    return false;
  }
  if (comments == "" || comments == null) {
    document.getElementById("error-msg").innerHTML =
      "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
    fadeIn();
    return false;
  }

  fetch("/php/contact.php", {
    method: "POST",
    headers: {
      Accept: "application/x-www-form-urlencoded",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: name,
      email: email,
      subject: subject,
      comments: comments,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (result.success) {
        document.getElementById("error-msg").innerHTML =
          "<div class='alert alert-success success_message'>" +
          result.success +
          "</div>";
        fadeIn();

        // Clear form
        document.forms["myForm"]["name"].value = "";
        document.forms["myForm"]["email"].value = "";
        document.forms["myForm"]["subject"].value = "";
        document.forms["myForm"]["comments"].value = "";
      } else if (result.error) {
        document.getElementById("error-msg").innerHTML =
          "<div class='alert alert-danger error_message'>" +
          result.error +
          "</div>";
        fadeIn();
      }
    })
    .catch(function (error) {
      document.getElementById("error-msg").innerHTML =
        "<div class='alert alert-danger error_message'>Something went wrong! Please email us directly at <strong>community@leadtowin.ca</strong></div>";
      fadeIn();
    });
  return false;
}
function fadeIn() {
  var fade = document.getElementById("error-msg");
  var opacity = 0;
  var intervalID = setInterval(function () {
    if (opacity < 1) {
      opacity = opacity + 0.5;
      fade.style.opacity = opacity;
    } else {
      clearInterval(intervalID);
    }
  }, 200);
}
