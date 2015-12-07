import Assign from 'object-assign'
import SetUniforms from './set-uniforms'

function NormalColor( material, normalConfig ) {
	
	this.name = "normalColor"
	this.flags = Assign({}, material.flags, { recompile : true })
	
	this.fragSource = material.fragSource
	this.vertSource = material.vertSource
	
	this.defines = material.defines.concat(["NORMAL_COLOR", "NORMAL"])
	this.shader = null
	this.mode = material.mode
	
	this.setUniforms = material.setUniforms.concat( SetUniforms )
	this.setAttributes = material.setAttributes.slice()
	
	this.shading = Assign({ normalColor: normalConfig }, material.shading)
	
}

export default function createNormalColor( material, properties ) {
	
	var normalConfig = Assign({
		amount : 1
	}, properties)
	
	if( typeof material === 'function' ) {
		
		return function createMaterialWithNormalColor() {
			
			//TODO - Create a function to do this thing
			var arity = material.length
			var originalMaterialArgs = Array.prototype.slice.call(arguments, 0, arity)
			var newNormalConfig = Assign( {}, normalConfig, arguments[arity] )
			
			return new NormalColor( material.apply(this, originalMaterialArgs), newNormalConfig )
		}
		
	} else {
		return new NormalColor( material, normalConfig )
	}
}