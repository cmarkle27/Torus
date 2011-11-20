/**
 * Blockus
 *
 */
 
var Blockus = function() {

	this.matrix = []; // all empty
	
}

// ------------------------------------------------------------------------

Blockus.prototype.checkPath = function(blocks) {

	// check if we can fall (function???)
	for (var i = 0; i < numBlocks; i++) {
		
		// bottom
		if (this.blocks[i].y + 1 === 18) {
			return false;
		}
		
	}
	



	for (var i = 0; i < blocks.length; i++) {
		this.matrix.push(blocks[i]);
	}
	console.log(this.matrix);
}

// ------------------------------------------------------------------------

Blockus.prototype.addToSet = function(set, values) {
	for (var i = 0; i < values.length; i++) {
		set[values[i]] = true;
	}
}

