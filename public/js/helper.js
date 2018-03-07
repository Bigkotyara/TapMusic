'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  onload();
})

var user = "";
var pass = "";

function onload() {
  
  $('#login-form-link').click(function(e) {
                              $("#login-form").delay(100).fadeIn(100);
                              $("#register-form").fadeOut(100);
                              $('#register-form-link').removeClass('active');
                              $(this).addClass('active');
                              e.preventDefault();
                              });
  $('#register-form-link').click(function(e) {
                                 $("#register-form").delay(100).fadeIn(100);
                                 $("#login-form").fadeOut(100);
                                 $('#login-form-link').removeClass('active');
                                 $(this).addClass('active');
                                 e.preventDefault();
                                 });
  
  $('#login-submit').click(function(e) {
                                 window.location.href = "/loggedIn";
                                 e.preventDefault();
                                 });
                                 
  $('#register-submit').click(function(e) {
                                 window.location.href = "/loggedIn";
                                 e.preventDefault();
                                 });
                                 
  
  };


var modal = document.getElementById('login-pop');

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}