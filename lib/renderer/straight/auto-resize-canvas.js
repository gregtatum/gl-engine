import CanvasFit from 'canvas-fit'

export default function autoResizeCanvas( gl, parentEl, doAutoResize ) {
	
	if( doAutoResize ) {
		var resize = CanvasFit( gl.canvas, parentEl )
		window.addEventListener('resize', resize, false)
		resize()
	}
}