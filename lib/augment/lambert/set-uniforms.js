export default function setUniforms (shader, camera, mesh) {
  shader.uniforms.uLambertDiffuse = mesh.material.shading.lambert.diffuse
}
