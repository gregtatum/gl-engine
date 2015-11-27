import CanvasFit from 'canvas-fit'

export default function autoAddCanvas( properties, gl ) {
	
	// Bail depending on config
	if( properties.canvas || properties.autoAddCanvas === false ) { return }
	
	// Add the canvas to a parent
	var parent = properties.parent || document.body
	parent.appendChild( gl.canvas )
	
	// Automatically size it
	if( properties.autoSizeCanvas !== false ) {
		var resize = CanvasFit( gl.canvas, parent )
		window.addEventListener('resize', resize, false)
		resize()
	}
}