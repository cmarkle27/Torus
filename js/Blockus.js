/**
 * Blockus
 *
 */
var Blockus = function() {

	this.matrix = []; // all empty
	
}

// ------------------------------------------------------------------------

Blockus.prototype.hitCheck = function(blocks) {

	var numBlocks = blocks.length;
	var matrixLength = this.matrix.length;
	var xNext, yNext;
	
	// check if any of our blocks have hit bottom or existing blocks
	for (var i = 0; i < numBlocks; i++) {

		yNext = blocks[i].y + 1;
		xNext = blocks[i].x;
	
		// bottom
		if (yNext === 15) {
			return false;
		} 
		
		// existing blocks
		for (var j = 0; j < matrixLength; j++) {
			if (this.matrix[j].y === yNext && this.matrix[j].x === xNext) {
				return false;
			}
		}
		
	}
	
	return true;

}

// ------------------------------------------------------------------------

Blockus.prototype.addBlocks = function(blocks) {

	var numBlocks = blocks.length;
	
	for (var i = 0; i < numBlocks; i++) {

		this.matrix.push(blocks[i]);
	}
	
}

// ------------------------------------------------------------------------

Blockus.prototype.overflow = function() {
	
	var matrixLength = this.matrix.length;

	for (var i = 0; i < matrixLength; i++) {

		if (this.matrix[i].y < 0) {
			return true;
		}
	}
	
}

// ------------------------------------------------------------------------

// remove blocks!!!

