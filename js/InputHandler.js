/**
 * InputHandler Object
 *
 */
var InputHandler = function(e) {

	// switch statement to handle the various valid types of input keys
	// The switch should then call on the appropriate Toroid function
	var keynum;
	if(window.event) { // IE
		keynum = e.keyCode;
	} else if(e.which) { // Netscape/Firefox/Opera
		keynum = e.which;
	}
	
	switch (keynum) {
		case 39: toroid.move(1); break; // right
		case 68: toroid.move(1); break; // right
		case 37: toroid.move(-1); break; // left
		case 65: toroid.move(-1); break; // left
		case 38: toroid.modSpeed = toroid.speed * .5; break; // up
		case 87: toroid.modSpeed = toroid.speed * .5; break; // up
		case 40: toroid.modSpeed = toroid.speed * -.5; break; // down
		case 83: toroid.modSpeed = toroid.speed * -.5; break; // down
		default: alert(keynum); break; 
	}
	
}
