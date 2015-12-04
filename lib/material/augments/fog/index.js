import Assign from 'object-assign'
import SetUniforms from './set-uniforms'

function Fog( material, fogConfig ) {
	
	this.flags = Assign({}, material.flags, { recompile : true })
	
	this.fragSource = material.fragSource
	this.vertSource = material.vertSource
	
	this.defines = material.defines.concat("FOG")
	this.shader = null
	this.mode = material.mode
	
	this.setUniforms = material.setUniforms.concat( SetUniforms )
	this.setAttributes = material.setAttributes.slice()
	
	this.shading = Assign({ fog: fogConfig }, material.shading)
	
}

export default function createFog( material, properties ) {
	
	var fogConfig = Assign({
		near : 10,
		far : 100,
		color : [0.4,0.4,0.5]
	}, properties)
	
	if( typeof material === 'function' ) {
		
		return function createMaterialWithFog() {
			
			//TODO - Create a function to do this thing
			var arity = material.length
			var originalMaterialArgs = Array.prototype.slice.call(arguments, 0, arity)
			var newFogConfig = Assign( {}, fogConfig, arguments[arity] )
			
			return new Fog( material.apply(this, originalMaterialArgs), newFogConfig )
		}
		
	} else {
		return new Fog( material, fogConfig )
	}
}