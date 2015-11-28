export default function setAttributes( geometry ) {
	geometry.buffers.attr( 'position', geometry.data.positions )
	geometry.buffers.faces( geometry.data.cells )
}