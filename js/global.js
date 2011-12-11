// global vars
// !should we just make a game object to contain all these???
var canvas = document.getElementById("torusScreen");
var context = canvas.getContext("2d");

var gameLoop = function() {

	if (blockus.hitCheck(toroid.blocks)) {
		toroid.fall();			
	} else {
		blockus.addBlocks(toroid.blocks);
		window.toroid = new Toroid();
	}
	
	if (blockus.overflow()) {
		alert('Deads!');
	} else {
		setTimeout(function() { gameLoop(); }, toroid.speed);
		toroid.reset();
	}
	
}