'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
});

$(window).bind("load", function() {
    if(!loggedIn){
        toolTippers();
    }
});
var loggedIn;
var audioElement = document.createElement('audio');
var playing = false;
var currDuration = 0;
var songs;
var categories;
var tags;

var current_category = "Sad";
var current_song = 0;
var tagList;
var ignoreList = [];
var rememberTags;
var rememberedTags;
/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    // add any functionality and listeners you want here

    $.getJSON("../songs.json", function(result) {
        songs = result.songs;
        tags = computeTags(songs);

    });

    $.getJSON("../categories.json", function(result) {
        categories = result;

    });



    $('#play-button, #play-button-ov').click(function(e) {
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

    $('#next-button, #next-button-ov').click(function(e) {
        e.preventDefault();
        ga('create', 'UA-114584880-2', 'auto');
        ga('send', 'event', 'song', 'skip');
        playNextSong();
    });

    $('#song-up').click(function(e) {
        openNav();
    });

    $('#song-down').click(function(e) {
        closeNav();
    });

    $('.emoji-button').click(function(e) {
        var category = $(e.target).find('.em-svg').addBack('.em-svg').attr('id');
        var parentdiv = document.getElementById($(e.target).closest('div').attr('id'));
        updateWheel(parentdiv, category);
    });

    audioElement.addEventListener("timeupdate", function() {
        $("#length").attr('style', "width:" + (audioElement.currentTime / currDuration) * 100 + "%");
    });

    audioElement.addEventListener("canplay", function() {
        currDuration = audioElement.duration;
    });

    window.SetVolume = function(val) {
        var player = audioElement;
        console.log('Before: ' + player.volume);
        player.volume = val / 100;
        console.log('After: ' + player.volume);
    }

    $('.chips').on('chip.add', function(e, chip) {

        //google analysis
        e.preventDefault();
        ga('create', 'UA-114584880-2', 'auto');
        ga('send', 'event', 'filter', 'add');

        if (!ignoreList.includes(chip.tag)) {
            ignoreList.push(chip.tag);
        }
        if (!passesIgnore(current_song)) {
            playNextSong();
        }
    });

    $('.chips').on('chip.delete', function(e, chip) {
        if (ignoreList.includes(chip.tag)) {
            let arrayInd = ignoreList.indexOf(chip.tag);
            ignoreList.splice(arrayInd, 1);
            //console.log(ignoreList);
        }
    });

    $('.chips-autocomplete').on('chip.select', function(e, chip) {

    });

    // for Page B alternate view

    $('.chips-initial').on('chip.select', function(e, chip) {

        //google analysis
        e.preventDefault();
        ga('create', 'UA-114584880-2', 'auto');
        ga('send', 'event', 'filter', 'add');

        if (!ignoreList.includes(chip.tag)) {
            ignoreList.unshift(chip.tag);
        }

        var ignored_chips = [];
        //ignored_chips.push({"tag":chip.tag});
        ignoreList.forEach(function(tag) {
            var newtag = {};
            newtag['tag'] = tag;
            ignored_chips.push(newtag);
        })

        $('.chips-autocomplete').material_chip({
            data: ignored_chips
        });

        $(e.target).find('.chip.selected').animate({
            opacity: 0
        }, {
            complete: function() {
                playNextSong();
            }
        });

    });
    $('.chips-initial').keydown(function(e) {
        e.preventDefault();
        return false;
    });


    // $('#remember').prop('checked',true);
    $('.close2').click(function(e) {
        if ($("#remember").is(':checked')) {
            rememberedTags = ignoreList;
            console.log(rememberedTags);
        }

    });

    audioElement.addEventListener('ended', function() {
        playNextSong();
    }, false);

}

function playNextSong() {
    $('#song-title').css("opacity","1");
    var tag = current_category;
    var len = songs.length;
    //console.log("length: " + len);
    var ran = Math.floor(Math.random() * len);
    //console.log("random: " +ran);
    var flag = true;
    var counter = 0;

    // chance category
    if (tag == "Chance") {
        tag = songs[ran].tags[0];
    }

    while (ran == current_song || !matchesCategory(ran) || !passesIgnore(ran)) {
        ran = Math.floor(Math.random() * len);
        if (current_category == "Chance") {
            tag = songs[ran].tags[0];
        }

        counter++;
        if (counter > 200) { //catch for infinte loop
            alert("no new songs! the song database is small now, try reducing your filters");
            break;
        }
        //console.log(counter);
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

    var chipTags = [];
    songs[current_song].tags.forEach(function(tagg) {
        var newtag = {};
        newtag['tag'] = tagg;
        chipTags.push(newtag);
    })

    // populate viewAlt chips per song
    $('.chips-initial').material_chip({
        data: chipTags
    });


    // new art (random)
    $('#album-art').attr("src", "http://lorempixel.com/315/315/abstract/");
    $('#category_header').html(current_category);
    return;
}

function passesIgnore(ranNum) {
    console.log(ignoreList);
    for (let i = 0; i < ignoreList.length; i++) {
        if (ignoreList[i] != current_category) {
            //console.log(ignoreList[i] + current_category);
            if (songs[ranNum].tags.includes(ignoreList[i])) {
                return false;
            }
        }
    }
    return true;
}

function matchesCategory(ranNum) {
    //console.log(current_category + " " + categories);
    if (current_category == "Chance") {
        return true;
    }
    var cat = categories[current_category];
    //console.log(cat);
    for (let i = 0; i < cat.length; i++) {
        //console.log(cat.length + current_category);
        if (songs[ranNum].tags.includes(cat[i])) {
            return true;
        }
    }
    return false;
}

function updateWheel(targetted, category) {
    console.log('Category is: ' + category);
    // update the music dropdownMenuButtonrmation to new selection
    current_category = category;
    playNextSong();

    // swap out most recent category icon
    var middle = document.getElementById("project2");
    swap(targetted, middle);

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

function swap(div1, div2) {
    var htmlOne = $(div1).html();
    var htmlTwo = $(div2).html();

    if (div1 != div2) {
        $(div1).animate({
            opacity: 0
        }, 'fast');
    }
    $(div2).animate({
        opacity: 0
    }, 'fast');

    if (div1 != div2) {
        $(div1).empty().html(htmlTwo);
        $(div2).empty().html(htmlOne);
    }

    if (div1 != div2) {
        $(div1).animate({
            opacity: 1
        }, 'fast');
    }
    $(div2).animate({
        opacity: 1
    }, 'fast');
}

function openNav() {
    document.getElementById("myNav").style.height = "92%";
    console.log("open overlay");
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    console.log("close overlay");
}


function computeTags(songList) {
    var tagList = {};
    songList.forEach(function(element) {

        element.tags.forEach(function(tag) {
            if (!(tag in tagList)) {
                tagList[tag] = null;
            }
        })
    })
    console.log(tagList);


    $('.chips-autocomplete').material_chip({
        autocompleteOptions: {
            data: tagList,
            limit: 6,
            minLength: 1
        }
    });

    return tagList;

}

function toolTippers(){
        $('#song-title').animate({color:"#ffef49",opacity:"1"},   {
            duration: 1500,
            complete: function(){
                $('#song-title').animate({opacity:"0.3",color:"white"},{duration:1500,complete:part2});
            }}
        );

    function part2(){
        $('#song-up').fadeOut(600,function(){
            $('#song-up').removeClass("glyphicon glyphicon-chevron-up");
            $('#song-up').css("color","#ffef49");
            $('#song-up').html("this raises the music player");
            $('#song-up').fadeIn(1000);
            $('#song-up').fadeOut(1200,function(){
                $('#song-up').addClass("glyphicon glyphicon-chevron-up");
                $('#song-up').css("color","white");
                $('#song-up').html("");
                $('#song-up').fadeIn(1000);
            });
        });
    }
    function part3(){
        $('#dropdownMenuButton').fadeOut(600,function(){
            $('#dropdownMenuButton').removeClass("glyphicon glyphicon-dropdownMenuButton-sign");
            $('#dropdownMenuButton').css("color","#ffef49");
            $('#dropdownMenuButton').html("more dropdownMenuButton");
            $('#dropdownMenuButton').fadeIn(1000);
            $('#dropdownMenuButton').fadeOut(1200,function(){
                $('#dropdownMenuButton').addClass("glyphicon glyphicon-dropdownMenuButton-sign");
                $('#dropdownMenuButton').css("color","#428bca");
                $('#dropdownMenuButton').html("");
                $('#dropdownMenuButton').fadeIn(1000);
            });
        });
    }

}