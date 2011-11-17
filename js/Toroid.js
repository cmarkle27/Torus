/**
 * Toroid Object
 *
 */
var Toroid = function(blocks, speed) {

	this.toroidBlocks = blocks;
	this.toroidSpeed = speed;

	this.fall();
	
}

// ------------------------------------------------------------------------

Toroid.prototype.drawBlocks = function() {

	var blocks = this.toroidBlocks;
	var numBlocks = blocks.length;
	
	for (var i = 0; i < numBlocks; i++) {
	
		var shape = {};
		shape.x = blocks[i].x
		shape.y = blocks[i].y
		shape.x *= 50;
		shape.y *= 50;
		context.beginPath();
		context.rect(shape.x, shape.y, 50, 50);
		context.fillStyle = "#8ED6FF";
		context.fill();

	}
	
	console.log(this.toroidBlocks);
	

}

// ------------------------------------------------------------------------

Toroid.prototype.clearBlocks = function() {

	var blocks = this.toroidBlocks;
	var numBlocks = blocks.length;
	
	for (var i = 0; i < numBlocks; i++) {
		var shape = {};
		shape.x = blocks[i].x
		shape.y = blocks[i].y
		shape.x *= 50;
		shape.y *= 50;
		context.clearRect(shape.x, shape.y, 50, 50);
	}

}

// ------------------------------------------------------------------------

Toroid.prototype.fall = function() {

	// clear any existing
	this.clearBlocks();

	var numBlocks = this.toroidBlocks.length;
	
	for (var i = 0; i < numBlocks; i++) {
		this.toroidBlocks[i].y += 1;
	}
	
	this.drawBlocks();

	var self = this; //proxy
	setTimeout(function() {
		self.fall();
	}, self.toroidSpeed);
	
}
