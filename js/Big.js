
// view stuff??? globals???
var canvas = document.getElementById("torusScreen");
var context = canvas.getContext("2d");
var tileSize = 40;
var boardWidth = 480;
var boardHeight = 600;
var tileImage = new Image();
tileImage.src = 'img/tile4.png';

// ------------------------------------------------------------------------

var Tetrimino = Backbone.Model.extend({

	defaults : {
		"orientation" : 0,
		"depth" : 0,
		"position" : 0,
		"shape" : null,
		"color" : "#000000"
	}

});

// ------------------------------------------------------------------------

var LiveTetrimino = Tetrimino.extend({
 
	initialize : function() {
		_.bindAll(this, "fall", "destroy");
		this.set({"shape" : this.randomShape()});
		this.set({"color" : this.randomColor()});
		this.set({"active" : true});
	},

	// this could be a private method under initialize??? or be moved to module methods???
	randomShape : function() {
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
	},
	
	// this could be a private method under initialize???
	randomColor : function() {
		var colors = ["#cc0000", "#3399ff", "#ffff33", "#33cc00", "#666666", "#3333ff", "#339900", "#bbbbbb"];
		return colors[Math.floor(Math.random() * colors.length)];
	},
	
	rotate : function(direction) {	
		var shape = this.get("shape");
		var orientation = this.get("orientation");
		
		if (direction === "left") {
			orientation++;
		} else {
			orientation--;
		}
		
		if (orientation === shape.length) {
			orientation = 0;
		} else if (orientation < 0) {
			orientation = shape.length - 1;
		}
		
		this.set({ "orientation" : orientation });
	},
	
	// should this be a controller or view method???
	move : function(direction) {	
		var shape = this.get("shape");
		var orientation = this.get("orientation");
		var position = this.get("position");
		var x = shape[orientation]["x"];
		var xCoord;
		
		if (direction === "left") {
			position++;
		} else {
			position--;
		}
				
		for (var i = 0; i < 4; i++) {
			
			xCoord = (x[i]*tileSize) + (position*tileSize);
			
			if (xCoord == boardWidth || xCoord < 0) {
				return;
			}
		}
		
		this.set({ "position" : position });
	},
	
	fall : function() {	
		var shape = this.get("shape");
		var orientation = this.get("orientation");
		var depth = this.get("depth");
		var y = shape[orientation]["y"];
		var yCoord;
		var deadTetrimino;

		depth++;

		for (var i = 0; i < 4; i++) {
			
			yCoord = (y[i]*tileSize) + (depth*tileSize);
			
			if (yCoord == boardHeight) {

				deadTetrimino = new Tetrimino({ 
					"orientation" : orientation,
					"depth" : depth-1,
					"position" : this.get("position"),
					"shape" : shape,
					"color" : this.get("color")
				}); // toJson???

				this.set({"active" : false});


				//this.destroy();

				//tetriminoes.add([deadTetrimino]);

				return;
			}
		}
		
		this.set({ "depth" : depth });
	},

	destroy: function() {
		
		//context.clearRect(0, 0, 480, 600);

		//this.remove(); //////

		
		//trigger start??? / restart gameloop
		window.loop = false;

		delete LiveTetriminoView;

		//view.remove();
		// destriy view too, and rerender as regular tetrimino
	}

	//url : "/#"
	
});

// ------------------------------------------------------------------------

var TetriminoView = Backbone.View.extend({

    initialize : function(){
    	_.bindAll(this, "render");
        this.render(); // render on init
        console.log('tv');
    },

    remove: function() {
        console.log("sssdd");
      },

    render : function(){
    	
    	var isActive = this.model.get("active");
		var shape = this.model.get("shape");
		var position = this.model.get("position");
		var orientation = this.model.get("orientation");
		var depth = this.model.get("depth");
		var color = this.model.get("color");
		var x = shape[orientation]["x"];
		var y = shape[orientation]["y"];
		var xCoord, yCoord;

    	context.clearRect(0, 0, 480, 600);

    	console.log(isActive);

    	if (isActive === false) {
    		this.model.destroy();
    	}

		for (var i = 0; i < 4; i++) {
			
			xCoord = (x[i]*tileSize) + (position*tileSize);
			yCoord = (y[i]*tileSize) + (depth*tileSize);
			
	     	context.beginPath();
	        context.rect(xCoord, yCoord, tileSize, tileSize);
	        context.fillStyle = color;
	        context.fill();
			
		    context.drawImage(tileImage, xCoord, yCoord, tileSize, tileSize);			

		}        
    }

});

var LiveTetriminoView = TetriminoView.extend({

    initialize : function(){
    	_.bindAll(this, "render", "onKeydown");
        //this.render(); // render on init
        this.model.bind('change', this.render); // render on model change
        $(document).bind('keydown', this.onKeydown);
    },
    
    onKeydown : function(e) {
		switch (e.keyCode) {
			case 39: 
			case 68: 
				this.model.move("left");
			break;
					
			case 37: 
			case 65: 
				this.model.move("right");
			break;

			case 190: 
				this.model.rotate("left");
			break;
					
			case 188: 
				this.model.rotate("right");
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

    }
    
});

// ------------------------------------------------------------------------

// var TetriminoCollection = Backbone.Collection.extend({

// 	model : Tetrimino,
	
// 	url : "/tetriminoes"
	
// });

// // --------------------------------------------------------------------

// var TetriminoCollectionView = Backbone.View.extend({

//     initialize : function() {
//     	_.bindAll(this, "render");
//         this.collection.bind('add', this.render); // render on model change
//     },

// 	render : function() {
// 		this.collection.each(function(tetrimino) {
// 			var tetriminoView = new TetriminoView({model: tetrimino});
// 			console.log(tetrimino);
// 		}, this);

// 		return this; // for chaining
// 	}

// });


// ------------------------------------------------------------------------

// GAMELOOP
function gameLoop(tetrimino) {

	tetrimino.fall();

	if (window.loop) {
		var mainTimeout = setTimeout(function() { 
			gameLoop(tetrimino);
		}, 300);
	}

}

// --------------------------------------------------------------------

// var tetriminoes = new TetriminoCollection();
// var tetriminoesView = new TetriminoCollectionView({collection:tetriminoes});


// --------------------------------------------------------------------


// view events (move to view?)

$(document).ready(function() {

	
	window.loop = true;
	
	$('#start').on('click', function() {
	
		//window.board = new Board({ 'level' : level });
		// global for debugging only
		activeTetrimino = new LiveTetrimino({ speed : 500 });
		activeTetriminoView = new LiveTetriminoView({model: activeTetrimino});
		
		//tetriminoes.add([activeTetrimino]);
		
		gameLoop(activeTetrimino);
		
	});
	
});