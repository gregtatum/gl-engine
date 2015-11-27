export default function setUniforms( shader, camera, mesh ) {
	shader.uniforms.projection = camera.projection
	shader.uniforms.view = camera.view
	shader.uniforms.model = mesh.transform.global
	shader.uniforms.color = mesh.material.shading.color
	shader.uniforms.opacity = mesh.material.shading.opacity
}