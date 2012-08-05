
// globals
var piecesContext = document.getElementById("pieces").getContext("2d");
var tileSize = 40;
var tileImage = new Image();
tileImage.src = 'img/tile_40.png';


var Tetrimino = function(ctx) {
	this.context = ctx;
	this.orientation = 0;
	this.depth = 4; // -3;
	this.position = 5;
	this.shape = this.randomShape();
	this.color = this.getColor(this.shape);
};

Tetrimino.prototype.randomShape = function() {
	var shapeArray = ["j", "o", "i", "l", "s", "z", "t"],
		shape = shapeArray[Math.floor(Math.random() * shapeArray.length)];
	return shape;
};

Tetrimino.prototype.getShape = function(shape) {
	var shapeList = {
		j : [
			{ "x" : [0, 1, 1, 1], "y" : [2, 2, 1, 0] },
			{ "x" : [0, 0, 1, 2], "y" : [0, 1, 1, 1] },
			{ "x" : [0, 0, 0, 1], "y" : [0, 1, 2, 0] },
			{ "x" : [0, 1, 2, 2], "y" : [0, 0, 0, 1] }
		],
		o : [
			{ "x" : [0, 1, 0, 1], "y" : [0, 1, 1, 0] }
		],
		i : [
			{ "x" : [0, 0, 0, 0], "y" : [0, 1, 2, 3] },
			{ "x" : [0, 1, 2, 3], "y" : [0, 0, 0, 0] }
		],
		l : [
			{ "x" : [0, 1, 0, 0], "y" : [2, 2, 1, 0] },
			{ "x" : [0, 1, 2, 0], "y" : [0, 0, 0, 1] },
			{ "x" : [0, 1, 1, 1], "y" : [0, 0, 1, 2] },
			{ "x" : [0, 1, 2, 2], "y" : [1, 1, 1, 0] }
		],
		s : [
			{ "x" : [0, 1, 1, 2], "y" : [1, 1, 0, 0] },
			{ "x" : [1, 1, 2, 2], "y" : [0, 1, 1, 2] }
		],
		z : [
			{ "x" : [0, 1, 1, 2], "y" : [0, 0, 1, 1] },
			{ "x" : [2, 1, 2, 1], "y" : [0, 1, 1, 2] }
		],
		t : [
			{ "x" : [0, 1, 1, 1], "y" : [1, 2, 1, 0] },
			{ "x" : [1, 0, 1, 2], "y" : [0, 1, 1, 1] },
			{ "x" : [0, 0, 0, 1], "y" : [0, 1, 2, 1] },
			{ "x" : [0, 1, 2, 1], "y" : [0, 1, 0, 0] }
		]
	};
	return shapeList[shape];
};

Tetrimino.prototype.getColor = function(shape) {

	var colors = {
		j: "#cc0000",
		o: "#3399ff",
		i: "#ffff33",
		l: "#33cc00",
		s: "#666666",
		z: "#3333ff",
		t: "#339900"
	};

	return colors[shape];
};

Tetrimino.prototype.render = function() {
	var position = this.position;
	var depth = this.depth;
	var color = this.color;
	var shape = this.getShape(this.shape);

	var x = shape[this.orientation]["x"];
	var y = shape[this.orientation]["y"];
	var xCoord, yCoord;
	var ctx = this.context;


	ctx.clearRect(0, 0, 480, 600);

	for (var i = 0; i < 4; i++) {
		xCoord = (x[i]*tileSize) + (position*tileSize);
		yCoord = (y[i]*tileSize) + (depth*tileSize);
		ctx.beginPath();
		ctx.rect(xCoord, yCoord, tileSize, tileSize);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize);
	}

	// return true or false???

};

//------------------

var tetrimino = new Tetrimino(piecesContext);
//var shape = tetrimino.getShape(tetrimino.shape);
//console.log(tetrimino.shape, " - ", tetrimino.color);




