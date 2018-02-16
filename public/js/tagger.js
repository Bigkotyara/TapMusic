'use strict';

// Call this function when the page loads (the "ready" event)
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
  } );