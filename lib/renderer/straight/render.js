import UpdateTransform from '../../transform/update'
import UpdateShaders   from './update-shaders'
import RenderDone      from '../../scene/render-done'

export default function renderStraightScene( renderer, scene, camera ) {

	var gl = renderer.gl
	var meshes = scene.flatten()

	gl.viewport(0,0,gl.canvas.width, gl.canvas.height)
	
	if( scene.current.changed ) {
		UpdateShaders( renderer.gl, meshes )
	}
	
	UpdateTransform( camera.transform )
	camera.update( renderer.canvas )
	
	for( var i=0; i < meshes.length; i++ ) {
		
		var mesh = meshes[i]
		var material = mesh.material
		var geometry = mesh.geometry
		
		if( material && geometry ) {
			
			geometry.buffers.bind( material.shader )
			UpdateTransform( mesh.transform )
			material.setUniforms( material.shader, camera, mesh )
			geometry.buffers.draw( gl[material.mode] )
			geometry.buffers.unbind()
		}
	}
	
	RenderDone( scene )
}