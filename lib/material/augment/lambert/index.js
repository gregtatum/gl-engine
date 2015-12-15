import Assign                      from 'object-assign'
import UseAugment                  from '../../common/use-augment'
import SetDirectionalLightUniforms from '../../../lights/directional/set-uniforms'

function Lambert( material ) {
	
	this.flags = Assign({}, material.flags, {
		recompile : true,
		useLights : true,
	})
	
	this.fragSource = material.fragSource
	this.vertSource = material.vertSource
	
	this.defines = material.defines.concat("LAMBERT")
	this.shader = null
	this.mode = material.mode
	
	// Only upload light uniforms if using a material that supports lights, e.g. LitMaterial
	var setUniforms = material.flags.useLights ? [] : [ SetDirectionalLightUniforms ]
	
	this.setUniforms = material.setUniforms.concat( setUniforms )
	this.setAttributes = material.setAttributes.slice()
	
	this.shading = material.shading
	this.use = UseAugment.bind( null, this )
	
}

export default function createLambert( material, properties ) {
	
	if( typeof material === 'function' ) {
		
		return function createMaterialWithLambert() {
			
			//TODO - Create a function to do this thing
			var arity = material.length
			var originalMaterialArgs = Array.prototype.slice.call(arguments, 0, arity)
			var newLambertConfig = Assign( {}, {}, arguments[arity] )
			
			return new Lambert( material.apply(this, originalMaterialArgs), newLambertConfig )
		}
		
	} else {
		return new Lambert( material )
	}
}