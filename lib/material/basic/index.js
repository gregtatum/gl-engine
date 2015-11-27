import CreateShader     from 'gl-shader'
import SetUniforms      from './set-uniforms'
import SetAttributes    from './set-attributes'

var fs = require('fs')

const fragSource = fs.readFileSync(__dirname + '/basic.frag', 'utf8')
const vertSource = fs.readFileSync(__dirname + '/basic.vert', 'utf8')

function GlamBasicMaterial() {
	
	this.flags = {
		visible : true,
		transparent : false,
		recompile : true
	}
	
	this.fragSource = fragSource
	this.vertSource = vertSource
	
	this.shader = null
	this.locations = null
	this.mode = "TRIANGLES"
	this.setUniforms = SetUniforms
	this.setAttributes = SetAttributes
	this.shading = {
		color    : [0.1, 0.1, 0.1],
		opacity  : 1.0
	}
	
}

export default function createBasicMaterial() {
	return new GlamBasicMaterial()
}