import CreateShader from 'gl-shader'
import CreateBuffers from 'gl-geometry'
import BuildDefines from './build-defines'

export default function updateShaders( gl, meshes ) {
	
	for( var i=0; i < meshes.length; i++ ) { 
		
		var mesh = meshes[i]
		var material = mesh.material
		var geometry = mesh.geometry
		
		// Recompile flags
		if( material && material.flags.recompile ) {
			
			if( material.shader ) {
				material.shader.update()
			} else {
				let defines = BuildDefines( material.defines )
				
				material.shader = CreateShader(
					gl,
					defines + material.vertSource,
					defines + material.fragSource
				)
			}
		}
		
		// Update buffers
		if( geometry && geometry.flags.updateBuffers ) {
			
			if( geometry.buffers ) {
				// TODO
				// geometry.buffers.update()
			} else {
				geometry.buffers = CreateBuffers( gl )
				material.setAttributes.forEach( fn => fn( geometry ) )
			}
		}
	}
}