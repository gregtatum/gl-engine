import UpdateTransform from '../../transform/update'
import UpdateShaders   from './update-shaders'
import RenderDone      from '../../scene/render-done'
import Clear           from './clear'
import UpdateLights    from './update-lights'

export default function renderForwardScene( renderer, scene, camera ) {

	var gl = renderer.gl
	var meshes = scene.flatten()
	var lights = scene.getLights( meshes, scene.flags.changed )
	
    gl.enable( gl.DEPTH_TEST )
	gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height )
	Clear( gl, renderer.clear )
	
	if( scene.flags.changed ) {
		UpdateShaders( renderer.gl, meshes, scene.counts )
	}
	
	UpdateTransform( camera.transform )
	camera.update( renderer.canvas )
	UpdateLights( lights )
	
	scene.emitter.emit('beforerender')
	
	for( let i=0; i < meshes.length; i++ ) {
		
		let mesh = meshes[i]
		let material = mesh.material
		let geometry = mesh.geometry
		
		if( material && geometry ) {
			
			if( material.shader.attributes.normal ) {
				camera.updateModelView( mesh.transform.global )
				camera.updateNormal()
			}
			
			geometry.buffers.bind( material.shader )
			UpdateTransform( mesh.transform )
			material.setUniforms.forEach( fn => fn( material.shader, camera, mesh, lights ) )
			geometry.buffers.draw( gl[material.mode] )
			geometry.buffers.unbind()
		}
	}
	
	scene.emitter.emit('afterrender')
	
	
	RenderDone( scene )
}