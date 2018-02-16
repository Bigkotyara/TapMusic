$(document).ready(function() {
	initializePage();
  $("#div2, #div3").hide();
    $("#moodbutton").on("click", function(){
        $("#div1, #div2").toggle();
    });

});

function initializePage() {
	$("#nextbutton").on("click", function(){
			$("#div2").hide();
			$("#div3").show();
			$('.emoji-button').click(function(e){
	        var category = $(e.target).find('.em-svg').addBack('.em-svg').attr('id');
	        var parentdiv = document.getElementById($(e.target).closest('div').attr('id'));
	        updateTutorialWheel(parentdiv, category);
	    });
	});

}

function updateTutorialWheel(targetted, category){
    console.log('updatewheel: ' + category);
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
