
// globals
var boardWidth = 480;
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

// could this use eachBlock???
Tetrimino.prototype.render = function() {
	var that = this,
		shape = that.getShape(that.shape),
		x = shape[that.orientation]["x"],
		y = shape[that.orientation]["y"],
		xCoord,
		yCoord;

	that.context.clearRect(0, 0, 480, 600);

	for (var i = 0; i < 4; i++) {
		xCoord = (x[i]*tileSize) + (that.position*tileSize);
		yCoord = (y[i]*tileSize) + (that.depth*tileSize);
		that.context.beginPath();
		that.context.rect(xCoord, yCoord, tileSize, tileSize);
		that.context.fillStyle = that.color;
		that.context.fill();
		that.context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize);
	}

	// return true or false???

};

//------------------

var GameBoard = function(ctx) {
	this.context = ctx;
	this.currentPiece = null;
};

GameBoard.prototype.createPiece = function() {
	this.currentPiece = new Tetrimino(piecesContext); // pc is global
	this.currentPiece.render(); //???
};

GameBoard.prototype.movePiece = function(direction) {

	var piecePosition = this.currentPiece.position,
		pieceDepth = this.currentPiece.depth;

	// we need to do a wall check, and a hit check, floor check
	if (direction === "left") {
		piecePosition -= 1;
	} else if (direction === "right") {
		piecePosition += 1;
	} else if (direction === "fall") {
		pieceDepth += 1;
	}

	if ( this.checkMove(piecePosition, pieceDepth) ) {
		this.currentPiece.position = piecePosition;
		this.currentPiece.depth = pieceDepth;
		this.currentPiece.render();
	}

};

/*GameBoard.prototype.eachBlock = function(callback) {
	var that = this,
		shape = that.getShape(that.shape),
		x = shape[that.orientation]["x"],
		y = shape[that.orientation]["y"],
		xCoord,
		yCoord;

	for (var i = 0; i < 4; i++) {
		callback();
	}

};*/


// should this be a local function???
GameBoard.prototype.checkMove = function(position, depth) {
	var piece = this.currentPiece,
		shape = piece.getShape(piece.shape),
		x = shape[piece.orientation]["x"],
		y = shape[piece.orientation]["y"],
		hits = 0,
		xCoord,
		yCoord;

	for (i = 0; i < 4; i++) {
		xCoord = x[i] + position;
		yCoord = y[i] + depth;


		// hit wall
		if (xCoord === (boardWidth/tileSize) || xCoord < 0) {
			hits += 1;
		}

		console.log(xCoord, boardWidth/tileSize, hits);
		// hit blocks
		//hits += this.hitCheck(xCoord, yCoord);
	}

	if (hits > 0) {
		return false;
	}

	return true;
};



//------------------


//var shape = tetrimino.getShape(tetrimino.shape);
//console.log(tetrimino.shape, " - ", tetrimino.color);

var gameBoard = new GameBoard(); // pass board ctx???

gameBoard.createPiece();


//-------------------

$(document).on('keydown', function(e) {
	switch (e.keyCode) {
		case 39:
		case 68:
			gameBoard.movePiece("right");
		break;

		case 37:
		case 65:
			gameBoard.movePiece("left");
		break;

	}
});




