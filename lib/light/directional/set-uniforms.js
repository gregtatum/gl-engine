export default function setUniforms (shader, camera, mesh, lights) {
  for (var i = 0; i < lights.length; i++) {
    shader.uniforms.uDirectionalLights[i].direction = lights[i].direction
    shader.uniforms.uDirectionalLights[i].color = lights[i].color
  }
}
