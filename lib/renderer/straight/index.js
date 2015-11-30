import Render           from './render'
import WebGLContext     from 'webgl-context'
import AutoAddCanvas    from './auto-add-canvas'
import AutoResizeCanvas from './auto-resize-canvas'
import Assign           from 'object-assign'

function StraightRenderer( gl, config, clear ) {
	
	var removeCanvas = AutoAddCanvas( gl.canvas, config.parentEl, config.autoAddCanvas )
	var removeResize = AutoResizeCanvas( gl.canvas, config.parentEl, config.autoResizeCanvas )
	
	this.gl = gl
	this.canvas = gl.canvas
	this.render = Render.bind( null, this )
	this.clear = clear
	this.destroy = function destroy() {
		removeCanvas()
		removeResize()
	}
}

export default function createStraightRenderer( properties ) {

	var config = Assign({
		autoAddCanvas    : true,
		autoResizeCanvas : true,
		canvas           : null,
		width            : null,
		height           : null,
		parentEl         : document.body,
		// Plus WebGLContextAttributes: https://www.khronos.org/registry/webgl/specs/1.0/#5.2
		// alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer,
		// preferLowPowerToHighPerformance, failIfMajorPerformanceCaveat
	}, properties)
	
	var clear = Assign({
		color : [1,1,1,1],
		depth : true,
		stencil : true
	}, config.clear)
	
	var gl = WebGLContext( config )
	if( !gl ) { return null }
	
	return new StraightRenderer( gl, config, clear )
}