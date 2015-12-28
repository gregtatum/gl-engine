import UpdateTransform from '../../transform/update'
import UpdateShaders   from './update-shaders'
import RenderDone      from '../../scene/render-done'
import Clear           from './clear'
import UpdateLights    from './update-lights'

export default function renderForwardScene( renderer, current, shaderCache, scene, camera ) {

	var gl = renderer.gl
	current.meshes = scene.flatten()
	current.lights = scene.getLights( current.meshes, scene.flags.changed )
	
    gl.enable( gl.DEPTH_TEST )
	gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height )
	Clear( gl, renderer.clear )
	
	if( scene.flags.changed ) {
		UpdateShaders( renderer.gl, shaderCache, current.meshes, scene )
	}
	
	UpdateTransform( camera.transform )
	camera.update( renderer.canvas )
	UpdateLights( current.lights )
	
	renderer.emitter.emit('beforerender')
	
	for( let i=0; i < current.meshes.length; i++ ) {
		
		let mesh = current.meshes[i]
		let material = mesh.material
		let geometry = mesh.geometry
		
		if( material && geometry ) {
			
			if( material.shader.attributes.aNormal ) {
				camera.updateModelView( mesh.transform.global )
				camera.updateNormal()
			}
			
			geometry.buffers.bind( material.shader )
			UpdateTransform( mesh.transform )
			material.setUniforms.forEach( fn => fn( material.shader, camera, mesh, current.lights ) )
			geometry.buffers.draw( gl[material.mode] )
			geometry.buffers.unbind()
		}
	}
	
	renderer.emitter.emit('afterrender')
	
	
	RenderDone( scene )
}
