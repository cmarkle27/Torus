
var GameBoard = function() {
	this.pieceContext = document.getElementById("piece").getContext("2d");
	this.boardContext = document.getElementById("board").getContext("2d");
	this.boardWidth = 480;
	this.boardHeight = 600;
	this.currentPiece = null;
	this.tileSize = 40;
	this.tileImage = new Image();
	this.tileImage.src = 'img/tile_40.png';
	this.pieceContext.clearRect(0, 0, this.boardWidth, this.boardHeight);
	this.boardContext.clearRect(0, 0, this.boardWidth, this.boardHeight);
};

GameBoard.prototype.createPiece = function() {
	this.currentPiece = new Tetrimino();
	this.currentPiece.render();
};

GameBoard.prototype.movePiece = function(direction) {

	var piecePosition = this.currentPiece.position,
		pieceDepth = this.currentPiece.depth;

	if (direction === "left") {
		piecePosition -= 1;
	} else if (direction === "right") {
		piecePosition += 1;
	} else if (direction === "down") {
		pieceDepth += 1;
	}
	// do "clockwise", and "counterclockwise" here too???

	// we need to do a wall check, a hit check, and a floor check
	if ( this.checkMove(piecePosition, pieceDepth) ) {
		this.currentPiece.position = piecePosition;
		this.currentPiece.depth = pieceDepth;
		this.currentPiece.render();
	} else if (direction === "down") {
		// we need to add the current piece to the board array
		// ...
		// and create a new one
		this.createPiece();
		console.log("the eagle has landed!");
	}

};

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
		if (xCoord === (this.boardWidth/this.tileSize) || xCoord < 0) {
			hits += 1;
		}

		// hit floor
		if (yCoord === (this.boardHeight/this.tileSize)) {
			hits += 1;
		}

		// hit blocks
		//hits += this.hitCheck(xCoord, yCoord);
	}

	if (hits > 0) {
		return false;
	}

	return true;
};

GameBoard.prototype.loop = function() {

	var that = this;

	// if this.running == true
	console.log("weee!!!");

	that.movePiece("down");

	var mainTimeout = setTimeout(function() {
		that.loop();
	}, 1000);

};

// -------------

var Tetrimino = function() {
	// should we create pc here???
	this.orientation = 0;
	this.depth = 4; // -3;
	this.position = 5;
	this.shape = this.randomShape();
	this.color = this.getColor(this.shape);
};

Tetrimino.prototype = new GameBoard();
Tetrimino.prototype.constructor = Tetrimino;

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
	var that = this,
		shape = that.getShape(that.shape),
		x = shape[that.orientation]["x"],
		y = shape[that.orientation]["y"],
		xCoord,
		yCoord;

	that.pieceContext.clearRect(0, 0, that.boardWidth, that.boardHeight);

	for (var i = 0; i < 4; i++) {
		xCoord = (x[i]*that.tileSize) + (that.position*that.tileSize);
		yCoord = (y[i]*that.tileSize) + (that.depth*that.tileSize);
		that.pieceContext.beginPath();
		that.pieceContext.rect(xCoord, yCoord, that.tileSize, that.tileSize);
		that.pieceContext.fillStyle = that.color;
		that.pieceContext.fill();
		that.pieceContext.drawImage(that.tileImage, xCoord, yCoord, that.tileSize, that.tileSize);
	}

	// return true or false???

};

//------------------





//------------------


//var shape = tetrimino.getShape(tetrimino.shape);
//console.log(tetrimino.shape, " - ", tetrimino.color);

var gameBoard = new GameBoard(); // pass board ctx???

gameBoard.createPiece();
gameBoard.loop();

// we need a loop!!!

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




