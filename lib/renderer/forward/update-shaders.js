import CreateBuffers from 'gl-geometry'
import BuildDefines from './build-defines'

export default function updateShaders( gl, shaderCache, meshes, lights, scene ) {
	
	if( scene.flags.changed ) {
		shaderCache.clearMeshes()
	}

	for( let i=0; i < meshes.length; i++ ) { 
		
		let mesh = meshes[i]
		let material = mesh.material
		let geometry = mesh.geometry
		
		// Recompile flag
		if( material && (material.flags.recompile || scene.flags.lightsChanged) ) {
			
			let defines = BuildDefines( material, scene )

			material.shader = shaderCache.getOrCreate( gl, mesh, defines ) 
			material.flags.recompile = false
		}
		
		// Update buffers
		if( geometry && geometry.flags.updateBuffers ) {
			
			if( geometry.buffers ) {
				// TODO
				// geometry.buffers.update()
			} else {
				geometry.buffers = CreateBuffers( gl )
				material.setAttributes.forEach( fn => fn( geometry, material.shader ) )
			}
		}
	}

	if( scene.flags.changed ) {
		shaderCache.clearUnused()
	}
}
