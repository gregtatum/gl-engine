export default function setAttributes( geometry, shader ) {
	geometry.buffers.attr( 'position', geometry.data.positions )
	geometry.buffers.faces( geometry.data.cells )
}