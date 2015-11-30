/** 

 * Geometry contains all of the data buffers for rendering. The buffers are managed by [stack.gl]{@link http://stack.gl}'s
 * [gl-module]{@link http://stack.gl/packages/#hughsk/gl-geometry}. Buffers typically consist of vertex positions, elements
 * arrays (known as cells, or faces), normals, and other per-vertex data.
 * @module geometry
 */

/**
 * @typedef Geometry
 * @property {number} flags @todo
 * @property {gl-geometry} buffers automatically set by the renderer after the first render
 * @property {number} data the data that is turned into ArrayBuffers.
 */

function Geometry( simplicialComplex ) {
	
	this.flags = {
		updateBuffers : true
	}
	
	this.buffers = null // gl-geometry
	
	this.data = {
		positions : simplicialComplex.positions,
		cells     : simplicialComplex.cells,
		normals   : simplicialComplex.normals,
	}
}

/**
 * The main exported function. Run it to create a Geometry.
 * @function geometry
 * @param {object} [simplicialComplex] Provide an initial simplicial complex, or simply put an object with
 *        a positions and cells attribute.
 * @returns {Geometry}
 */

export default function geometry( simplicialComplex ) {
	return new Geometry( simplicialComplex ? simplicialComplex : {} )
}