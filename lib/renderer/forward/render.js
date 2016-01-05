import UpdateTransform from '../../transform/update'
import UpdateShaders   from './update-shaders'
import RenderDone      from '../../scene/render-done'
import Clear           from './clear'
import UpdateLights    from './update-lights'

export default function renderForwardScene( renderer, shaderCache, scene, camera ) {

	var gl = renderer.gl
	var meshes = scene.getByType( 'mesh' )
	var lights = scene.getByType( 'light' )
	
    gl.enable( gl.DEPTH_TEST )
	gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height )
	Clear( gl, renderer.clear )
	
	if( scene.flags.changed ) {
		UpdateShaders( renderer.gl, shaderCache, meshes, lights, scene )
	}
	
	scene.updateTransforms()

	camera.update( renderer.canvas )
	UpdateLights( lights )
	
	renderer.emitter.emit('beforerender')

	for( let i=0; i < meshes.length; i++ ) {
		
		let mesh = meshes[i]
		let material = mesh.material
		let geometry = mesh.geometry
		
		if( material && geometry ) {
			
			if( material.shader.attributes.aNormal ) {
				camera.updateModelView( mesh.transform.global )
				camera.updateNormal()
			}
			
			geometry.buffers.bind( material.shader )
			material.setUniforms.forEach( fn => fn( material.shader, camera, mesh, lights ) )
			geometry.buffers.draw( gl[material.mode] )
			geometry.buffers.unbind()
		}
	}
	
	renderer.emitter.emit('afterrender')
	
	
	RenderDone( scene )
}
