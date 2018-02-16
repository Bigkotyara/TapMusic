$(document).ready(function() {
	initializePage();
  $("#div2, #div3").hide();
    $("#preview").on("click", function(){
        $("#div1, #div2").toggle();
    });

});

function initializePage() {
	$("#nextbutton").on("click", function(){
			$("#div2").hide();
			$("#div3").show();
	});

}
