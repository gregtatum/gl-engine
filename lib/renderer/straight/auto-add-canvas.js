export default function autoAddCanvas( canvas, parentEl, doAppend ) {
	
	if( doAppend ) {
		
		parentEl.appendChild( canvas )
		
		return function removeCanvas() {
			parentEl.removeChild( canvas )
		}
	}
	
	return function doNothing() {}
}