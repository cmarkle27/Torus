// global vars
// !should we just make a game object to contain all these???
var canvas = document.getElementById("torusScreen");
var context = canvas.getContext("2d");

var gameLoop = function() {

	if (blockus.hitCheck(toroid.blocks)) {
		toroid.fall();			
	} else {
		blockus.addBlocks(toroid.blocks);
		
		blockus.torusCheck();
		
		window.toroid = new Toroid();
	}
	
	if (blockus.overflow()) {
		$('#modal-from-dom').modal('show');
	} else {
		setTimeout(function() { gameLoop(); }, toroid.speed);
		toroid.reset();
	}
	
}