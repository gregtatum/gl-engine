function GlamGeometry( simplicialComplex ) {
	
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

export default function createGeometry( simplicialComplex ) {
	return new GlamGeometry( simplicialComplex ? simplicialComplex : {} )
}