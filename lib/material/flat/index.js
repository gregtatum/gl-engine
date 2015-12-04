// Browserify Transforms:
import CreateShader     from 'gl-shader'
import SetUniforms      from './flat-set-uniforms'
import SetAttributes    from './flat-set-attributes'

var fs = require('fs')

const fragSource = require('glslify')(__dirname + '/flat.frag')
const vertSource = require('glslify')(__dirname + '/flat.vert')

function FlatMaterial() {
	
	this.flags = {
		visible : true,
		transparent : false,
		recompile : true
	}
	
	this.fragSource = fragSource
	this.vertSource = vertSource
	
	this.defines = ["CAMERA"]
	this.shader = null
	this.mode = "TRIANGLES"
	this.setUniforms = [SetUniforms]
	this.setAttributes = [SetAttributes]
	this.shading = {
		color    : [0.1, 0.1, 0.1],
		opacity  : 1.0
	}
	
}

export default function createFlatMaterial() {
	return new FlatMaterial()
}
