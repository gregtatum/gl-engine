export default function setUniforms( shader, camera, mesh ) {
	shader.uniforms.fog.near  = mesh.material.shading.fog.near
	shader.uniforms.fog.far   = mesh.material.shading.fog.far
	shader.uniforms.fog.color = mesh.material.shading.fog.color
}