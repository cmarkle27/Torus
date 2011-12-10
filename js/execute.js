// !maybe this file should be split into globsl.js and events.js

// global vars
// !should we just make a game object to contain all these???
var canvas = document.getElementById("torusScreen");
var context = canvas.getContext("2d");
var blockus = new Blockus();
var toroid = new Toroid();

var speedMod = 0;

var gameLoop = function() {

	if (blockus.hitCheck(toroid.blocks)) {
		toroid.fall();			
	} else {
		blockus.addBlocks(toroid.blocks);
		toroid = new Toroid();
	}
	
	// check overflow for gameover
	if (blockus.overflow()) {
		alert('Deads!');
	} else {
		setTimeout(function() { gameLoop(); }, toroid.speed + speedMod);
	}

	speedMod = 0;
	
}

// ------------------------------------------------------------------------

// events
$("body").keydown(function(e) {

	switch (e.keyCode) {
		case 39: 
		case 68: 
			toroid.move(blockus.matrix, 1);	// right
			break;
				
		case 37: 
		case 65: 
			toroid.move(blockus.matrix, -1); // left	
			break;
			
		case 38: 
		case 87: 
			speedMod = toroid.speed * .5; 
			break; // up
		
		case 40: 
		case 83: 
			speedMod = toroid.speed * -.5; 
			break; // down
		
		default: console.log(e.keyCode);
	}
	
});

$(document).ready(function() {
	gameLoop();
});
