'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    acquireSongsJSON();
    initializePage();
});

var audioElement = document.createElement('audio');
var playing = false;
var currDuration = 0;
var songs;

var current_category = "Sad";
var current_song = 0;
var tagList;
var ignoreList = [];
var rememberedTags;
/*
 * Function that is called when the document is ready.
 */
function initializePage() {

	// add any functionality and listeners you want here

    $.getJSON("../songs.json",function(result){
        songs = result.songs;
        audioElement.addEventListener('ended', playNextSong(), false);
    });

    $('#play-button, #play-button-ov').click(function(e){
        if (playing) {
            //$(this).find('span').toggleClass('glyphicon glyphicon-play').toggleClass('glyphicon glyphicon-pause');
            pause();
            playing = false;
        } else {
            //$(this).find('span').toggleClass('glyphicon glyphicon-play').toggleClass('glyphicon glyphicon-pause');
            play();
            playing = true;
        }
                    });

    $('#next-button, #next-button-ov').click(function(e){
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

    audioElement.addEventListener("timeupdate",function(){
        $("#length").attr('style', "width:" + (audioElement.currentTime/currDuration)*100 + "%");
    });

    audioElement.addEventListener("canplay",function(){
        currDuration = audioElement.duration;
    });

    

		window.SetVolume = function(val)
		{
		    var player = audioElement;
		    console.log('Before: ' + player.volume);
		    player.volume = val / 100;
		    console.log('After: ' + player.volume);
		}

    $('.chips-autocomplete').material_chip({
    /*autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      },
      limit: Infinity,
      minLength: 1
    },*/
        placeholder: 'Enter a tag',
        secondaryPlaceholder: 'Add Tag',
        data: rememberedTags
    });

    $('.chips').on('chip.add', function(e, chip){
        if(!ignoreList.includes(chip.tag)){
            ignoreList.push(chip.tag);
        }
        if(!passesIgnore(current_song)){
            playNextSong();
        }
    });

    $('.chips').on('chip.delete', function(e, chip){
        if(ignoreList.includes(chip.tag)){
            let arrayInd = ignoreList.indexOf(chip.tag);
            ignoreList.splice(arrayInd,1);
            //console.log(ignoreList);
        }
    });

    $('.chips').on('chip.select', function(e, chip){
   
    });

   // $('#remember').prop('checked',true);
    $('.close2').click(function(e){
        if($("#remember").is(':checked')){
            rememberedTags = ignoreList;
            console.log(rememberedTags);
        }

    });


}

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

    while(ran == current_song || !songs[ran].tags.includes(tag) || !passesIgnore(ran)){
        ran = Math.floor(Math.random()*len);
        if(current_category == "Chance"){
            tag = songs[ran].tags[0];
        }

        counter++;
        if(counter > 200){ //catch for infinte loop
            alert("no new songs!");
            break;
        }
        console.log(tag);
    }
    current_song = ran;
    $('#song-title').text(songs[ran].title);
    $('#song-title-ov').text(songs[ran].title);
    $('#song-artist-ov').text(songs[ran].artist);
    if (songs[ran].source) {
        audioElement.setAttribute('src', songs[ran].source);
        play();
    } else {
        audioElement.setAttribute('src', '');
        pause();
    }


    // new art (random)
    $('#album-art').attr("src","http://lorempixel.com/315/315/abstract/");
    $('#category_header').html(current_category);
    return;
}

function passesIgnore(ranNum){
    console.log(ranNum);
    for(let i = 0; i < ignoreList.length; i++){
        if(ignoreList[i] != current_category){
            console.log(ignoreList[i] + current_category);
            if(songs[ranNum].tags.includes(ignoreList[i])){
                return false;
            }
        }
    }
    return true;
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

function play() {
    if (!playing) {
        $('#play-button').find('span').toggleClass('glyphicon glyphicon-play').toggleClass('glyphicon glyphicon-pause');
        $('#play-button-ov').find('span').toggleClass('glyphicon glyphicon-play').toggleClass('glyphicon glyphicon-pause');
        playing = true;
    }
    audioElement.play();
    console.log("Playing...");
}

function pause() {
    if (playing) {
        $('#play-button').find('span').toggleClass('glyphicon glyphicon-play').toggleClass('glyphicon glyphicon-pause');
        $('#play-button-ov').find('span').toggleClass('glyphicon glyphicon-play').toggleClass('glyphicon glyphicon-pause');
        playing = false;
    }
    audioElement.pause();
    console.log("Stopped...");
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

function acquireSongsJSON(){

}
