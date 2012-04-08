// events
/*
$("body").keydown(function(e) {

	switch (e.keyCode) {
		case 39: 
		case 68: 
			toroid.move(blockus.matrix, 1);	// right
			break;
				
		case 37: 
		case 65: 
			toroid.move(blockus.matrix, -1); // left	
			break;
			
		case 38: 
		case 87: 
			toroid.push(.5);
			break; // up
		
		case 40: 
		case 83: 
			toroid.push(-.5);
			break; // down
		
		default: console.log(e.keyCode);
	}
	
});
*/

$(document).ready(function() {
	
	$('#begin').on('click', function() {
	
		window.board = new Board({ 'level' : level });
		// global for debugging only
		
		$(this).html('Restart Game');

	});
	
	// modal dialogs
	$('#modal-from-dom').modal({backdrop: 'static'});

	$('#close').on('click', function(e) {
		$('#modal-from-dom').modal('hide');
	});	
	
});