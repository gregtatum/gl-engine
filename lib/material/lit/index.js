// Browserify Transforms:
import CreateShader     from 'gl-shader'
import SetUniforms      from './set-uniforms'
import SetAttributes    from './set-attributes'
import Assign           from 'object-assign'
import UseAugment       from '../../augment/use-augment'

const fragSource = require('fs').readFileSync(__dirname + '/lit.built.frag', 'utf8')
const vertSource = require('fs').readFileSync(__dirname + '/lit.built.vert', 'utf8')

function LitMaterial( shadingConfig ) {
	
	this.flags = {
		visible : true,
		transparent : false,
		recompile : true,
		useLights : true,
	}
	
	this.fragSource = fragSource
	this.vertSource = vertSource
	
	this.defines = ["CAMERA", "NORMAL"]
	this.shader = null
	this.mode = "TRIANGLES"
	this.setUniforms = [SetUniforms]
	this.setAttributes = [SetAttributes]
	this.shading = shadingConfig
	
	this.use = UseAugment.bind( null, this )
}

export default function createLitMaterial( properties ) {
	
	var shadingConfig = Assign({
		color    : [0.1, 0.1, 0.1],
		opacity  : 1.0
	}, properties)
	
	return new LitMaterial( shadingConfig )
}
