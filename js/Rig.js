
var TetrisBoard = (function() {

	/**
	 * hitCheck()
	 * @access: private
	 */ 
	function hitCheck(boardTetrimino, xCoord, yCoord) {

		var hits = 0;
		var boardShape = boardTetrimino.shape[boardTetrimino.orientation];
		var boardBlocks = boardShape.x.length;
		var boardDepth = boardTetrimino.depth;
		var boardPosition = boardTetrimino.position;
		var boardShapeX, boardShapeY;
		
		// check if any of our existing blocks have been hit
		for (var j = 0; j < boardBlocks; j++) {

			boardShapeX = boardShape.x[j] + boardPosition;
			boardShapeY = boardShape.y[j] + boardDepth;
			
			if (boardShapeY === yCoord && boardShapeX === xCoord) {
				hits += 1;
			}			
			
		}

		return hits;

	}

	// object instance
	var obj = function() {
		this.tetriminoes = [];
	}

	// object prototype (static)
	obj.prototype = {

		addTetrimino : function(oldTetrimino) {
			var deadTetrimino = new Tetrimino();
			// we should make a construct option instead
			deadTetrimino.shape = oldTetrimino.shape;
			deadTetrimino.orientation = oldTetrimino.orientation;
			deadTetrimino.depth = oldTetrimino.depth;
			deadTetrimino.position = oldTetrimino.position;
			deadTetrimino.color = oldTetrimino.color;

			this.tetriminoes.push(deadTetrimino);
			delete oldTetrimino;

			_.each(this.tetriminoes, function(boardTetrimino){
				boardTetrimino.render(boardContext);
			});
		},

		checkDown : function(tetrimino) {

			var shape = tetrimino.shape;
			var orientation = tetrimino.orientation;
			var depth = tetrimino.depth;
			var position = tetrimino.position;
			var x = shape[orientation]["x"];
			var y = shape[orientation]["y"];
			var hits = 0;
			var xCoord, yCoord;

			for (var i = 0; i < 4; i++) {
				
				xCoord = x[i] + position;
				yCoord = y[i] + depth;
				
				// hit floor
				if (yCoord == (boardHeight/tileSize)) {
					hits += 1;
				}

				// hit blocks?
				_.each(this.tetriminoes, function(boardTetrimino) { 
					hits += hitCheck(boardTetrimino, xCoord, yCoord); 
				});
			}

			if (hits > 0) {
				tetrimino.depth -= 1;
				this.addTetrimino(tetrimino);
				return false;
			}
				
			return true;

		}

	};

	return obj;

})();

// --------------------------------------------------------------------

// Tetrimino
var Tetrimino = (function() {

	/**
	 * randomShape()
	 * @access: private
	 */ 
	function randomShape() {
		var shapes = {
			j : new Array(
				{ "x" : [0, 1, 1, 1], "y" : [2, 2, 1, 0] },
				{ "x" : [0, 0, 1, 2], "y" : [0, 1, 1, 1] },
				{ "x" : [0, 0, 0, 1], "y" : [0, 1, 2, 0] },
				{ "x" : [0, 1, 2, 2], "y" : [0, 0, 0, 1] }
			)
			// i, o, l, s, z, t;
		};
		return shapes.j;//shapes[Math.floor(Math.random() * shapes.length)];
	}

	/**
	 * randomColor()
	 * @access: private
	 */ 
	function randomColor() {
		var colors = ["#cc0000", "#3399ff", "#ffff33", "#33cc00", "#666666", "#3333ff", "#339900", "#bbbbbb"];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	// object instance
	var obj = function() {
		this.orientation = 0;
		this.depth = 0;
		this.position = 0;
		this.shape = randomShape();
		this.color = randomColor();
	}

	// object prototype (static)
	obj.prototype = {

		render : function(context) {

			var position = this.position;
			var depth = this.depth;
			var color = this.color;
			var x = this.shape[this.orientation]["x"];
			var y = this.shape[this.orientation]["y"];
			var xCoord, yCoord;

			// clear
			//context.clearRect(0, 0, 480, 600); // maybe per context???
			// board should be a seperate canvas???

			for (var i = 0; i < 4; i++) {
				xCoord = (x[i]*tileSize) + (position*tileSize);
				yCoord = (y[i]*tileSize) + (depth*tileSize);

				context.beginPath();
				context.rect(xCoord, yCoord, tileSize, tileSize);
				context.fillStyle = color;
				context.fill();
				context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize);
			}
		},

		fall : function() {	
			this.depth += 1;
		},

		rotate : function(direction) {
			var orientation = this.orientation;

			if (direction === "left") {
				orientation++;
			} else {
				orientation--;
			}

			if (orientation === this.shape.length) {
				orientation = 0;
			} else if (orientation < 0) {
				orientation = this.shape.length - 1;
			}

			this.orientation = orientation;
		},

		move : function(direction) {	
			var position = this.position;
			var x = this.shape[this.orientation]["x"];
			var xCoord;

			if (direction === "left") {
				position -= 1;
			} else {
				position += 1;
			}

			for (var i = 0; i < 4; i++) {

				xCoord = (x[i]*tileSize) + (position*tileSize);

				if (xCoord == boardWidth || xCoord < 0) {
					return;
				}
			}

			this.position = position;
		}

	};

	return obj;

})();

// --------------------------------------------------------------------

function gameLoop(tetrimino, board) {

	if (board.checkDown(tetrimino) === false) {
		console.log("ssssstop!!!");
		dropTetrimino(board);
	} else {

		piecesContext.clearRect(0, 0, 480, 600);
		tetrimino.render(piecesContext);

		// te.fall()
		tetrimino.fall();

		if (window.loop == false) { return false; }

		var mainTimeout = setTimeout(function() { 
			gameLoop(tetrimino, board);
		}, 500);		
	}
}

// --------------------------------------------------------------------

// view stuff??? globals???
var piecesCanvas = document.getElementById("pieces");
var piecesContext = piecesCanvas.getContext("2d");

var boardCanvas = document.getElementById("board");
var boardContext = boardCanvas.getContext("2d");

var tileSize = 40;
var boardWidth = 480;
var boardHeight = 600;
var tileImage = new Image();
tileImage.src = 'img/tile4.png';

function dropTetrimino(currentBoard) {

	var activeTetrimino = new Tetrimino();

	var tokenMove = PubSub.subscribe("move", function(message, direction) { 
		activeTetrimino.move(direction);
		piecesContext.clearRect(0, 0, 480, 600);
		activeTetrimino.render(piecesContext);
	});

	var tokenRotate = PubSub.subscribe("rotate", function(message, direction) {
		activeTetrimino.rotate(direction);
		piecesContext.clearRect(0, 0, 480, 600);
		activeTetrimino.render(piecesContext);
	});

	gameLoop(activeTetrimino, currentBoard);
}

// --------------------------------------------------------------------

$(document).ready(function() {

	window.loop = true;


	
	$('#start').on('click', function() {
		var newBoard = new TetrisBoard();
		dropTetrimino(newBoard);
	});

	// --------------------------------------------------------------------

	$(document).on('keydown', function(e) {
		switch (e.keyCode) {
			case 39: 
			case 68: 
				PubSub.publish("move", "right");
			break;
					
			case 37: 
			case 65: 
				PubSub.publish("move", "left");
			break;

			case 190: 
				PubSub.publish("rotate", "right");
			break;
					
			case 188: 
				PubSub.publish("rotate", "left");
			break;
				
/*
			case 38: 
			case 87: 
				toroid.push(.5);
			break; // up
			
			case 40: 
			case 83: 
				toroid.push(-.5);
			break; // down
*/
			
			default: 
				console.log(e.keyCode);
			break;
		}
	});
	
});

