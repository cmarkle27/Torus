
// globals
var piecesContext = document.getElementById("pieces").getContext("2d");


var Tetrimino = function(ctx) {
	this.context = ctx;
	this.orientation = 0;
	this.depth = -3;
	this.position = 5;
	this.shape = this.randomShape();
	//this.newShape = this.randomShape();
	//this.color = this.getColor(this.shape);
};

Tetrimino.prototype.randomShape = function() {
	var shapeArray = ["j", "o", "i", "l", "s", "z", "t"];
	var shape = shapeArray[Math.floor(Math.random() * shapeArray.length)];
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

	console.log(shape);
	// should get color based on shape

	var colors = ["#cc0000", "#3399ff", "#ffff33", "#33cc00", "#666666", "#3333ff", "#339900", "#bbbbbb"];
	return colors[Math.floor(Math.random() * colors.length)];
};

//------------------

var tetrimino = new Tetrimino(piecesContext);
var shape = tetrimino.getShape(tetrimino.shape);
console.log(tetrimino.shape, shape);



