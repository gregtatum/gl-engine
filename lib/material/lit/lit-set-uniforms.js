export default function setUniforms( shader, camera, mesh ) {
	
	shader.uniforms.uCamera.projection    = camera.projection
	shader.uniforms.uCamera.position      = camera.transform.position
	shader.uniforms.uCamera.view          = camera.view
	shader.uniforms.uCamera.modelView     = camera.modelView
	shader.uniforms.uCamera.normal        = camera.normal
	
	shader.uniforms.model                = mesh.transform.global
	
	shader.uniforms.color                = mesh.material.shading.color
	shader.uniforms.opacity              = mesh.material.shading.opacity
}