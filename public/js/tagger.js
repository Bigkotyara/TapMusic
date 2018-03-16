'use strict';

/* Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    var tags = [
      "Happy",
      "Workout",
      "Sad",
      "Study",
      "Relax",
      "Thinking",
      "Love",
      "Angry",
      "Mad",
      "Heavy",
      "Fast",
      "Metal",
      "Long",
      "Suffer",
      "Rock",
      "Bass",
      "2000s",
      "70s",
      "80s",
      "90s",
      "Profanity",
      "Club"
    ];
    $( "#tags" ).autocomplete({
      source: tags
    });
  } );*/

$('#add-tag').click(function(e) {
  var t = document.getElementById("tags");
        //alert('You pressed enter! ' + t.value);
        //$("<p>Test"+$('#tags').val()+"</p>").insertAfter($('.login-form'));
        ignoreList.push($('#tags').val());
        //console.log(ignoreList);
        $("#tags-stored").append("<p>"+$('#tags').val()+"</p>");
});