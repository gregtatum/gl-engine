export default function setUniforms( shader, camera, mesh ) {
	
	shader.uniforms.uCamera.projection    = camera.projection
	shader.uniforms.uCamera.position      = camera.position
	shader.uniforms.uCamera.view          = camera.view
	shader.uniforms.uCamera.modelView     = camera.modelView
	shader.uniforms.uCamera.normal        = camera.normal
	
	shader.uniforms.uModel                = mesh.transform.global
	
	shader.uniforms.uColor                = mesh.material.shading.color
	shader.uniforms.uOpacity              = mesh.material.shading.opacity
}