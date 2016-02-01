import CreateShader from 'gl-shader'

export default function createShaderOrGetCached (cache, gl, mesh, defines) {
  var material = mesh.material
  var key = defines + material.vertSource + material.fragSource
  var cachedEntry = cache[key]

  var shader

  if (cachedEntry) {
    shader = cachedEntry.shader
    cachedEntry.meshes.push(mesh)
  } else {
    // Create and cache the shader
    shader = CreateShader(
      gl,
      defines + material.vertSource,
      defines + material.fragSource
    )

    cache[key] = {
      shader: shader,
      meshes: [ mesh ]
    }
  }

  return shader
}
