// Browserify Transforms:
import CreateShader     from 'gl-shader'
import SetUniforms      from './flat-set-uniforms'
import SetAttributes    from './flat-set-attributes'
import Assign           from 'object-assign'
import UseAugment       from '../common/use-augment'

const fragSource = require('fs').readFileSync(__dirname + '/flat.built.frag', 'utf8')
const vertSource = require('fs').readFileSync(__dirname + '/flat.built.vert', 'utf8')

function FlatMaterial( shadingConfig ) {
	
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
	this.shading = shadingConfig
	this.use = UseAugment.bind( null, this )
}

export default function createFlatMaterial( properties ) {
	
	var shadingConfig = Assign({
		color    : [0.1, 0.1, 0.1],
		opacity  : 1.0
	}, properties)
	
	return new FlatMaterial( shadingConfig )
}
