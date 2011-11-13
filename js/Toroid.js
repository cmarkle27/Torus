/**
 * Toroid Object
 *
 */
var Toroid = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    
    this.fall();
    
}

// ------------------------------------------------------------------------

Toroid.prototype.fall = function() {

	// clear any existing
	context.clearRect(this.x, this.y, 50, 50);	

	// adjust & draw
 	this.y += 1;
	this.draw(); // should take an object???

	// repeat
	var self = this;
	setTimeout(function() {
		self.fall();
	}, this.speed);
	
}

// ------------------------------------------------------------------------

Toroid.prototype.draw = function() {
	
	context.beginPath();
	context.rect(this.x, this.y, 50, 50);
	context.fillStyle = "#8ED6FF";
	context.fill();

	console.log(this.getData());

}

// ------------------------------------------------------------------------

Toroid.prototype.getData = function(){
    return { x: this.x, y: this.y, speed: this.speed };
}
