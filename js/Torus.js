/**
 * oxo
 * oxo
 * xxo
 */
var jUp = [{x:1, y:0}, {x:1, y:1}, {x:0, y:2}, {x:1, y:2}];
/**
 * xoo
 * xxx
 * ooo
 */
var jLeft = [{x:0, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}];
/**
 * xoo
 * xxx
 * ooo
 */
var jRight = [{x:0, y:0}, {x:0, y:1}, {x:1, y:1}, {x:2, y:1}];


/**
 * Toroid Object
 *
 */
var Toroid = function() {

	var types = ['i', 'j', 'o', 'l', 's', 'z', 't'];
	var colors = ['#cc0000', '#3399ff', '#ffff33', '#33cc00', '#666666', '#3333ff', '#339900', '#bbbbbb'];
	
	var type = types[Math.floor(Math.random() * types.length)];

	this.color = colors[Math.floor(Math.random() * colors.length)];

	this.j = [{x:0, y:-1}, {x:1, y:-1}, {x:1, y:-2}, {x:1, y:-3}];
	this.i = [{x:1, y:0}, {x:1, y:-1}, {x:1, y:-2}, {x:1, y:-3}];
	this.o = [{x:1, y:-1}, {x:1, y:-2}, {x:2, y:-2}, {x:2, y:-1}];
	this.l = [{x:2, y:-1}, {x:1, y:-1}, {x:1, y:-2}, {x:1, y:-3}];
	this.s = [{x:1, y:-1}, {x:2, y:-1}, {x:2, y:-2}, {x:3, y:-2}];
	this.z = [{x:3, y:-1}, {x:2, y:-1}, {x:2, y:-2}, {x:1, y:-2}];
	this.t = [{x:1, y:-1}, {x:2, y:-1}, {x:3, y:-1}, {x:2, y:-2}];

	this.tile = new Image();
	// this should be random too
	this.tile.src = 'img/tile4.png';
	// we should also randomize where they start <-x->

	this.blocks = this[type];

	this.width = 40; 

	this.numBlocks = this.blocks.length;
	this.speed = 500;
	
}

// ------------------------------------------------------------------------

Toroid.prototype.draw = function() {

	var shape;

	for (var i = 0; i < this.numBlocks; i++) {

	    shape = {};
		shape.x = this.blocks[i].x;
		shape.y = this.blocks[i].y;
		shape.x *= this.width;
		shape.y *= this.width;

        context.beginPath();
        context.rect(shape.x, shape.y, this.width, this.width);
        context.fillStyle = this.color;
        context.fill();
		
	    context.drawImage(this.tile, shape.x, shape.y, this.width, this.width);

	}
	
}

// ------------------------------------------------------------------------

Toroid.prototype.clear = function() {

	var shape;

	for (var i = 0; i < this.numBlocks; i++) {

	    shape = {};
		shape.x = this.blocks[i].x;
		shape.y = this.blocks[i].y;
		shape.x *= this.width;
		shape.y *= this.width;
		
		context.clearRect(shape.x, shape.y, this.width, this.width);

	}

}

// ------------------------------------------------------------------------

/**
 * this method allows the shapes to go left and right
 *
 */
Toroid.prototype.move = function(matrix, amount) {

	var noBlocks = true;	
	var noWalls = true;
	var xNext, yNext;
	
	var matrixLength = matrix.length;
	
	for (var i = 0; i < this.numBlocks; i++) {

		xNext = this.blocks[i].x + amount;
		yNext = this.blocks[i].y;

		// walls
		if (xNext === 12 || xNext === -1) {
			noWalls = false;
		}

		// blocks
		for (var j = 0; j < matrixLength; j++) {
			if (matrix[j].y === yNext && matrix[j].x === xNext) {
				noBlocks = false;
			}
		}

	}
	
	if (noWalls && noBlocks) {
		this.clear();
		for (var i = 0; i < this.numBlocks; i++) {
			this.blocks[i].x += amount;
		}	
		this.draw();
	}
	
}

// ------------------------------------------------------------------------

Toroid.prototype.fall = function() {

	this.clear();
	for (var i = 0; i < this.numBlocks; i++) {
		this.blocks[i].y += 1;
	}
	this.draw();
	
}

// ------------------------------------------------------------------------

Toroid.prototype.push = function(amount) {

	this.speed = 500 + 500 * amount;
	
}

// ------------------------------------------------------------------------

Toroid.prototype.reset = function() {

	this.speed = 500;
	
}

// ------------------------------------------------------------------------


//rotate the toroid...
