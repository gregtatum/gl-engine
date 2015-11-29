export default function autoAddCanvas( gl, parentEl, doAppend ) {
	
	if( doAppend ) {
		// Add the canvas to a parent
		parentEl.appendChild( gl.canvas )
	}
}