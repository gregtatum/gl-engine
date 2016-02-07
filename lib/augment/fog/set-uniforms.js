export default function setUniforms (shader, camera, mesh) {
  shader.uniforms.uFog.near = mesh.material.shading.fog.near
  shader.uniforms.uFog.far = mesh.material.shading.fog.far
  shader.uniforms.uFog.color = mesh.material.shading.fog.color
}
