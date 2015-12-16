export default function setUniforms( shader, camera, mesh ) {
	shader.uniforms.lambertDiffuse = mesh.material.shading.lambert.diffuse
}