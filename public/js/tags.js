'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  onload();
})

var tags2 = [
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

    var chip = {
    tag: 'chip content',
    image: '', //optional
    id: 1, //optional
  };

  function onload() {


$('.chips-initial').material_chip('data');
  $('.chips').material_chip();

  $('.chips-placeholder').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Tag',
  });
  $('.chips-autocomplete').material_chip({
    autocompleteOptions: {
      data: {
        'Sad': null,
        'Slow': null,
        'Piano': null,
        'Positive': null,
        'Relax': null,
        'Happy': null
      },
      limit: Infinity,
      minLength: 1
    }
  });
};


