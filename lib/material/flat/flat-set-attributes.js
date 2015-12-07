export default function setAttributes( geometry, shader ) {
	if( shader.attributes.normal ) { geometry.buffers.attr( 'normal', geometry.data.normals ) }
	geometry.buffers.attr( 'position', geometry.data.positions )
	geometry.buffers.faces( geometry.data.cells )
}