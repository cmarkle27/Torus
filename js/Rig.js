
var TetrisBoard = (function() {

	/**
	 * hitCheck()
	 * @access: private
	 */ 
	function hitCheck(boardTetrimino, xCoord, yCoord) {
		var boardShape = boardTetrimino.shape[boardTetrimino.orientation];
		var boardBlocks = boardShape.x.length;
		var boardDepth = boardTetrimino.depth;
		var boardPosition = boardTetrimino.position;
		var boardShapeX, boardShapeY;
		var hits = 0;
		
		for (var j = 0; j < boardBlocks; j++) {
			boardShapeX = boardShape.x[j] + boardPosition;
			boardShapeY = boardShape.y[j] + boardDepth;
			if (boardShapeY === yCoord && boardShapeX === xCoord) {
				hits += 1;
			}			
		}

		return hits;
	}

	// --------------------------------------------------------------------

	var obj = function() {
		this.tetriminoes = [];
		this.depths = new Array(14); // use board const!
		// this.depths.push();
		console.log(_.map(this.depths, function(num) { return 0; }));
	}

	// --------------------------------------------------------------------

	obj.prototype = {

		addTetrimino : function(deadTetrimino) {

			var lastDepths;
			this.tetriminoes.push(deadTetrimino);

			// we need to add to our depths array;
			lastDepths = deadTetrimino.shape[deadTetrimino.orientation].y;
			//lastDepths = _.uniq(lastDepths);

			// push to depths
			//...

			var x = _.map(lastDepths, function(num) { 

				this.depths[num + deadTetrimino.depth];


				return num + deadTetrimino.depth; 
			});

			//console.log(x);






			// publish event????




			var boardShapeX, boardShapeY;
			var lineCount = [];
			var redLine;



			

			//boardContext.clearRect(0, 0, 480, 600);

			// loop over last peice depths only???

			// check for lines???
			// for (var y = 14; y > 0; y--) {

			// 	lineCount[y] = 0;

			// 	_.each(this.tetriminoes, function(boardTetrimino) {

			// 		boardShapeX = boardTetrimino.shape[boardTetrimino.orientation].x;
			// 		boardShapeY = boardTetrimino.shape[boardTetrimino.orientation].y;

			// 		for (var i = 0; i < boardShapeY.length; i++) {
			// 			if (boardShapeY[i]+boardTetrimino.depth === y) {
			// 				lineCount[y] += 1;
			// 			}
			// 		}

			// 	});

			// 	// temp number
			// 	// remove
			// 	if (lineCount[y] === 12) {

			// 		_.each(this.tetriminoes, function(boardTetrimino) {

			// 			console.log("id: "+boardTetrimino.id);

			// 			redLine = y - boardTetrimino.depth;

			// 			console.log(redLine);

			// 			//boardShapeX = boardTetrimino.shape[boardTetrimino.orientation].x;
			// 			boardShapeY = boardTetrimino.shape[boardTetrimino.orientation].y;

			// 			for (var i = 0; i < boardShapeY.length; i++) {

			// 				if (boardTetrimino.shape[boardTetrimino.orientation].y[i] === redLine) {
			// 					delete boardTetrimino.shape[boardTetrimino.orientation].y[i];
			// 					delete boardTetrimino.shape[boardTetrimino.orientation].x[i];
			// 				}

			// 				// if (boardShapeY[i]+boardTetrimino.depth === y) {
			// 				// 	lineCount += 1;
			// 				// }
			// 			}

			// 			boardTetrimino.depth++;
			// 			boardTetrimino.render(boardContext);

			// 			//stepTetrimonos.push(boardTetrimino);

			// 		});
			// 	}

			// 	//this.tetriminoes = stepTetrimonos;
				
			// }

			console.log("----------------");

			this.render();


		},

		render : function() {
			boardContext.clearRect(0, 0, 480, 600);
			_.each(this.tetriminoes, function(boardTetrimino) {
				boardTetrimino.render(boardContext);
			});
		},

		checkHeight : function() {
			var overBoard = 0;
			_.each(this.tetriminoes, function(boardTetrimino) {
				if (boardTetrimino.depth < 0) {
					overBoard += 1;
				}
			});
			return (overBoard === 0);
		},

		checkFall : function(tetrimino) {
			var shape = tetrimino.shape;
			var orientation = tetrimino.orientation;
			var depth = tetrimino.depth;
			var position = tetrimino.position;
			var x = shape[orientation]["x"];
			var y = shape[orientation]["y"];
			var xCoord, yCoord;
			var hits = 0;

			for (var i = 0; i < 4; i++) {
				xCoord = x[i] + position;
				yCoord = y[i] + depth;
				
				// hit floor
				if (yCoord == (boardHeight/tileSize)) {
					hits += 1;
				}

				// hit blocks
				_.each(this.tetriminoes, function(boardTetrimino) { 
					hits += hitCheck(boardTetrimino, xCoord, yCoord); 
				});
			}

			if (hits > 0) {
				tetrimino.depth -= 1;
				return false;
			}
				
			return true;
		},

		checkMove : function(tetrimino, direction) {
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

				// hit wall
				if (xCoord == (boardWidth/tileSize) || xCoord < 0) {
					hits += 1;
				}

				// hit blocks
				_.each(this.tetriminoes, function(boardTetrimino) { 
					hits += hitCheck(boardTetrimino, xCoord, yCoord); 
				});
			}

			if (hits > 0) {
				tetrimino.position += (direction === "left") ? 1 : -1;
				return false;
			}

			return true;
		}

	};

	return obj;

})();

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------

// Tetrimino
var Tetrimino = (function(options) {

	/**
	 * randomShape()
	 * @access: private
	 */ 
	function randomShape() {
		var shapeArray = ["j", "o", "i"];
		var shapes = {
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
			l : [],
			s : [],
			z : [],
			t : [] 
		};
		return shapes[shapeArray[Math.floor(Math.random() * shapeArray.length)]];
	}

	/**
	 * randomColor()
	 * @access: private
	 */ 
	function randomColor() {
		var colors = ["#cc0000", "#3399ff", "#ffff33", "#33cc00", "#666666", "#3333ff", "#339900", "#bbbbbb"];
		return colors[Math.floor(Math.random() * colors.length)];
	}

	var nextId = 0;

	// object instance
	var obj = function() {
		this.orientation = 0;
		this.depth = -3;
		this.position = 0;
		this.shape = randomShape();
		this.color = randomColor();
		this.id = ++nextId;
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

			//context.clearRect(0, 0, 480, 600); // maybe per context???

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
			if (direction === "left") {
				this.orientation++;
			} else {
				this.orientation--;
			}
			if (this.orientation === this.shape.length) {
				this.orientation = 0;
			} else if (this.orientation < 0) {
				this.orientation = this.shape.length - 1;
			}
		},

		move : function(direction) {	
			if (direction === "left") {
				this.position -= 1;
			} else {
				this.position += 1;
			}
		}

	};

	return obj;

})();

// --------------------------------------------------------------------

function gameLoop() {

	PubSub.publish("fall");

	if (window.loop === false) { return false; }

	var mainTimeout = setTimeout(function() { 
		gameLoop();
	}, 300);

}

// --------------------------------------------------------------------

// view stuff??? globals???
var piecesCanvas = document.getElementById("pieces");
var piecesContext = piecesCanvas.getContext("2d");

var boardCanvas = document.getElementById("board");
var boardContext = boardCanvas.getContext("2d");

var boardWidth = 480;
var boardHeight = 600;

var tileSize = 40;
var tileImage = new Image();
tileImage.src = 'img/tile4.png';

// --------------------------------------------------------------------

function dropTetrimino(currentBoard) {
	// move to Board???

	var activeTetrimino = new Tetrimino();

	var tokenFall = PubSub.subscribe("fall", function(message) { 
		activeTetrimino.fall();
		if (currentBoard.checkFall(activeTetrimino) === true) {
			piecesContext.clearRect(0, 0, 480, 600);
			activeTetrimino.render(piecesContext);
		} else {
			PubSub.unsubscribe(tokenFall);
			PubSub.unsubscribe(tokenMove);
			PubSub.unsubscribe(tokenRotate);

			// add tetri
			currentBoard.addTetrimino(activeTetrimino);

			// check height
			if (currentBoard.checkHeight() === false) {
				alert("Failure!!!");
				window.loop = false;
			} else {
				dropTetrimino(currentBoard);
			}
		}
	});

	var tokenMove = PubSub.subscribe("move", function(message, direction) { 
		activeTetrimino.move(direction);
		if (currentBoard.checkMove(activeTetrimino, direction) === true) {
			piecesContext.clearRect(0, 0, 480, 600);
			activeTetrimino.render(piecesContext);
		}
	});

	var tokenRotate = PubSub.subscribe("rotate", function(message, direction) {
		activeTetrimino.rotate(direction);
		piecesContext.clearRect(0, 0, 480, 600);
		activeTetrimino.render(piecesContext);
	});

}

// --------------------------------------------------------------------

$(document).ready(function() {

	window.loop = true;

	
	$('#start').on('click', function() {
		var newBoard = new TetrisBoard();
		dropTetrimino(newBoard);
		gameLoop();
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
				// these need keyup too
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

