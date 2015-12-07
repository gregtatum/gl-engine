export default function setUniforms( shader, camera, mesh ) {
	
	shader.uniforms.camera.projection    = camera.projection
	shader.uniforms.camera.position      = camera.transform.position
	shader.uniforms.camera.view          = camera.view
	shader.uniforms.camera.modelView     = camera.modelView
	shader.uniforms.camera.normal        = camera.normal
	
	shader.uniforms.model                = mesh.transform.global
	
	shader.uniforms.color                = mesh.material.shading.color
	shader.uniforms.opacity              = mesh.material.shading.opacity
}