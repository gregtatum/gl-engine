export default function setUniforms( shader, camera, mesh ) {
	shader.uniforms.uCamera.projection = camera.projection
	shader.uniforms.uCamera.position = camera.transform.position
	shader.uniforms.uCamera.view = camera.view
	shader.uniforms.uModel = mesh.transform.global
	shader.uniforms.uColor = mesh.material.shading.color
	shader.uniforms.uOpacity = mesh.material.shading.opacity
}