import CreateShader     from 'gl-shader'
import SetUniforms      from './set-uniforms'
import SetAttributes    from './set-attributes'

var fs = require('fs')

const fragSource = fs.readFileSync(__dirname + '/flat.frag', 'utf8')
const vertSource = fs.readFileSync(__dirname + '/flat.vert', 'utf8')

function FlatMaterial() {
	
	this.flags = {
		visible : true,
		transparent : false,
		recompile : true
	}
	
	this.fragSource = fragSource
	this.vertSource = vertSource
	
	this.shader = null
	this.mode = "TRIANGLES"
	this.setUniforms = SetUniforms
	this.setAttributes = SetAttributes
	this.shading = {
		color    : [0.1, 0.1, 0.1],
		opacity  : 1.0
	}
	
}

export default function createFlatMaterial() {
	return new FlatMaterial()
}