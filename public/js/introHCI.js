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
                        playNextSong();
                    });

    $('#next-button-ov').click(function(e){
                        playNextSong();
                    });

    $('#song-up').click(function(e){
                        openNav();
    });

    $('#song-down').click(function(e){
        closeNav();
    });

    $('.emoji-button').click(function(e){
        var category = $(e.target).find('.em-svg').addBack('.em-svg').attr('id');
        var parentdiv = document.getElementById($(e.target).closest('div').attr('id'));
        updateWheel(parentdiv, category);
    });

    tagList = computeTags();
}

var current_category = "Sad";
var current_song = 0;
var tagList;

function playNextSong() {
    var tag = current_category;
	var len = songs.length;
    //console.log("length: " + len);
    var ran = Math.floor(Math.random()*len);
    //console.log("random: " +ran);
    var flag = true;
    var counter = 0;

    // chance category
    if(tag == "Chance"){
        tag = songs[ran].tags[0];
    }

    while(ran == current_song || !songs[ran].tags.includes(tag)){
        ran = Math.floor(Math.random()*len);
        if(tag == "Chance"){
            tag = songs[ran].tags[0];
        }

        counter++;
        if(counter > 100){ //catch for infinte loop
            alert("no new songs!");
            break;
        }
    }
    current_song = ran;
    $('#song-title').text(songs[ran].title);
    $('#song-title-ov').text(songs[ran].title);
    $('#song-artist-ov').text(songs[ran].artist);

    // new art (random)
    $('#album-art').attr("src","http://lorempixel.com/315/315/abstract/");
    return;
}

function updateWheel(targetted, category){
    console.log('updatewheel: ' + category);
    // update the music information to new selection
    current_category = category;
    playNextSong();

    // swap out most recent category icon
    var middle = document.getElementById("project2");
    swap(targetted,middle);

}

function swap(div1,div2){
        var htmlOne = $(div1).html();
        var htmlTwo = $(div2).html();
        
        if(div1 != div2){
            $(div1).animate({opacity:0},'fast');
        }
		$(div2).animate({opacity:0},'fast'); 

        if(div1 != div2){
		    $(div1).empty().html(htmlTwo);
            $(div2).empty().html(htmlOne);
        }

        if(div1 != div2){
            $(div1).animate({opacity:1},'fast');
        }
		$(div2).animate({opacity:1},'fast');
}

function openNav() {
    document.getElementById("myNav").style.height = "100%";
    console.log("open overlay");
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    console.log("close overlay");
}

function computeTags(){
    var tagList = [];
    songs.forEach(function(element){

        element.tags.forEach(function(tag){
            if(!tagList.includes(tag)){
                tagList.push(tag);
            }
        })
    })
    console.log(tagList);
    return tagList;
}