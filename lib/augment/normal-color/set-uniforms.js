export default function setUniforms (shader, camera, mesh) {
  shader.uniforms.uNormalColorAmount = mesh.material.shading.normalColor.amount
}
