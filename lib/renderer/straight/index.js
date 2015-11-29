import Render        from './render'
import WebGLContext  from 'webgl-context'
import AutoAddCanvas from './auto-add-canvas'
import AutoResizeCanvas from './auto-resize-canvas'
import Assign        from 'object-assign'

function StraightRenderer( gl ) {
	this.gl = gl
	this.canvas = gl.canvas
	this.render = Render.bind( null, this )
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
	
	var gl = WebGLContext( config )
	
	if( !gl ) { return null }
	
	AutoAddCanvas( gl, config.parentEl, config.autoAddCanvas )
	AutoResizeCanvas( gl, config.parentEl, config.autoResizeCanvas )
	
	return new StraightRenderer( gl )
}