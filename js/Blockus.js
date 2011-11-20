/**
 * Blockus
 *
 */
var Blockus = function() {

	this.matrix = []; // all empty
	
}

// ------------------------------------------------------------------------

Blockus.prototype.checkPath = function(blocks, direction) {

	var numBlocks = blocks.length;
	var matrixLength = this.matrix.length;
	
	var nextX, nextY;
	
	//temp
	var direction = 'default';

	// check if any of our blocks have hit bottom or existing blocks
	for (var i = 0; i < numBlocks; i++) {

		switch (direction) {
		case 'a': 
			//code 
			break;  
		case 'b':
			//code
			break;
		default:
			nextX = blocks[i].x;
			nextY = blocks[i].y + 1;
		}
	
		if (nextY === 15) {
			return false;
		} else {
			for (var j = 0; j < matrixLength; j++) {
				if (this.matrix[j].y === nextY && this.matrix[j].x === nextX) {
					return false;
				}
			}
		}
		
	}
	return true;
	

}

// ------------------------------------------------------------------------

Blockus.prototype.add = function(blocks) {

	var numBlocks = blocks.length;
	
	for (var i = 0; i < numBlocks; i++) {

		this.matrix.push(blocks[i]);
	}
	
	console.log(this.matrix);
	
}
