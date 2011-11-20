/**
 * Toroid Object
 *
 */
var Toroid = function() {

	var types = ['i', 'j', 'x', 'x'];
	var type = types[Math.floor(Math.random() * types.length)];

	this.j = [{x:1, y:-1}, {x:2, y:-1}, {x:2, y:-2}, {x:2, y:-3}];
	this.i = [{x:0, y:0}, {x:0, y:-1}, {x:0, y:-2}, {x:0, y:-3}];
	this.x = [{x:0, y:-1}, {x:1, y:-1}, {x:1, y:-2}, {x:1, y:-3}];

	this.blocks = this[type];

	this.WIDTH = 40; 

	this.numBlocks = this.blocks.length;
	this.speed = 500;
	
	
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
		context.rect(shape.x, shape.y, this.WIDTH, this.WIDTH);
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
		context.clearRect(shape.x, shape.y, this.WIDTH, this.WIDTH);
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
	
}

// ------------------------------------------------------------------------

//move the toriod...

//rotate the toroid...
