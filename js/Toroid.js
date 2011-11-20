/**
 * Toroid Object
 *
 */
var Toroid = function(type, speed) {

	this.j = [{x:0, y:-1}, {x:1, y:-1}, {x:1, y:-2}, {x:1, y:-3}];
	this.i = [{x:0, y:0}, {x:0, y:-1}, {x:0, y:-2}, {x:0, y:-3}];

	this.WIDTH = 40; 

	this.blocks = this[type];
	this.numBlocks = this.blocks.length;
	this.speed = speed;
	
	
}

// ------------------------------------------------------------------------

Toroid.prototype.draw = function() {
	
	for (var i = 0; i < this.numBlocks; i++) {
	
		var shape = {};
		shape.x = this.blocks[i].x
		shape.y = this.blocks[i].y
		shape.x *= this.WIDTH;
		shape.y *= this.WIDTH;
		context.beginPath();
		context.rect(shape.x, shape.y+(this.WIDTH*4), this.WIDTH, this.WIDTH);
		context.fillStyle = "#8ED6FF";
		context.fill();

	}
	
}

// ------------------------------------------------------------------------

Toroid.prototype.clear = function() {

	for (var i = 0; i < this.numBlocks; i++) {
		var shape = {};
		shape.x = this.blocks[i].x
		shape.y = this.blocks[i].y
		shape.x *= this.WIDTH;
		shape.y *= this.WIDTH;
		context.clearRect(shape.x, shape.y+(this.WIDTH*4), this.WIDTH, this.WIDTH);
	}

}

// ------------------------------------------------------------------------

Toroid.prototype.fall = function() {

	// clear any existing
	this.clear();
	
	for (var i = 0; i < this.numBlocks; i++) {
		this.blocks[i].y += 1;
	}
	
	this.draw();

	var self = this; //proxy
	setTimeout(function() {
		self.fall();
	}, self.speed);
	
}

// ------------------------------------------------------------------------

/*
function addToSet(set, values) {
	for (var i = 0; i < values.length; i++) {
		set[values[i]] = true;
	}
}
function removeFromSet(set, values) {
	for (var i = 0; i < values.length; i++) {
		delete set[values[i]];
	}
}
*/


