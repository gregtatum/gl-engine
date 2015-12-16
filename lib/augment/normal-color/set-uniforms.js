export default function setUniforms( shader, camera, mesh ) {
	shader.uniforms.normalColorAmount = mesh.material.shading.normalColor.amount
}