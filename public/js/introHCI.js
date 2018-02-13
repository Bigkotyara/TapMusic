'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// add any functionality and listeners you want here
    
    $('button.btn.btn-default').click(function(e){
                        $(this).find('span').toggleClass('glyphicon glyphicon-play').toggleClass('glyphicon glyphicon-pause');
                    });
}
