import Render from './render'
import WebGLContext from 'webgl-context'
import AutoAddCanvas from './auto-add-canvas'

function GlamStraightRenderer( gl ) {
	this.gl = gl
	this.canvas = gl.canvas
	this.render = Render.bind( null, this )
	this.current = {
		flags : {
			cleanScene : false
		}
	}
}

export default function createStraightRenderer( properties ) {

	properties = properties || {}

	var gl = WebGLContext( properties )
	
	if( !gl ) { return null }
	
	AutoAddCanvas( properties, gl )
	
	return new GlamStraightRenderer( gl )
}