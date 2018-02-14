'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    

});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	// add any functionality and listeners you want here
    
    $('button.btn.btn-default').click(function(e){
                        $(this).find('span').toggleClass('glyphicon glyphicon-play').toggleClass('glyphicon glyphicon-pause');
                    });

    $('#next-button').click(function(e){
                        $('#song-title').text(getNextSong());
                    });

    $('#song-up').click(function(e){
                        openNav();
                    });

    $('#song-down').click(function(e){
                        closeNav();
                    });
}

function getNextSong() {
	return songs[0].title;
}

function openNav() {
    document.getElementById("myNav").style.height = "100%";
    console.log("open overlay");
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    console.log("close overlay");
}
