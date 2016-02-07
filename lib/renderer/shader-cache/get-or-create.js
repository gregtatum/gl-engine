import CreateShader from 'gl-shader'
import StripUnusedFunctions from '../shader-parser/strip-unused-fns'

export default function createShaderOrGetCached (cache, gl, mesh, defines) {
  var material = mesh.material
  var key = defines + material.vertSource + material.fragSource
  var cachedEntry = cache[key]

  var shader

  if (cachedEntry) {
    shader = cachedEntry.shader
    cachedEntry.meshes.push(mesh)
  } else {
    shader = CreateShader(
      gl,
      StripUnusedFunctions(defines + material.vertSource, material.defines),
      StripUnusedFunctions(defines + material.fragSource, material.defines)
    )
    
    cache[key] = {
      shader: shader,
      meshes: [ mesh ]
    }
  }

  return shader
}
