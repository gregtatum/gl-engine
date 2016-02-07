import Test from 'tape'
import { Mesh, Geometry, FlatMaterial, ForwardRenderer } from '../../lib'
import ShaderCache from '../../lib/renderer/shader-cache'

Test('Shader Cache', function (t) {
  t.plan(7)
  var renderer = ForwardRenderer({
    autoAddCanvas: false
  })
  var cache = ShaderCache()
  var meshA = Mesh(Geometry(), FlatMaterial())
  var meshB = Mesh(Geometry(), FlatMaterial())

  var shaderA = cache.getOrCreate(renderer.gl, meshA, '')
  var shaderB = cache.getOrCreate(renderer.gl, meshB, '')

  var shaderA2 = cache.getOrCreate(renderer.gl, meshA, '')
  var shaderB2 = cache.getOrCreate(renderer.gl, meshB, '')

  t.equal(shaderA, shaderB, 'Caches the shader across meshes')
  t.equal(shaderA, shaderA2, 'Caches the shader across time')
  t.equal(shaderB, shaderB2, 'Caches the shader across time')

  cache.clearMeshes()

  var shaderA3 = cache.getOrCreate(renderer.gl, meshA, '')

  t.equal(shaderA, shaderA3, 'Cache retains the copy after clearMeshes')
  t.equal(shaderB, shaderA3, 'Cache retains the copy after clearMeshes')

  cache.clearMeshes()
  cache.clearUnused()

  var shaderA4 = cache.getOrCreate(renderer.gl, meshA, '')

  t.notEqual(shaderA, shaderA4, 'Does not retain cache if no meshes used it previously')
  t.notEqual(shaderB, shaderA4, 'Does not retain cache if no meshes used it previously')

  renderer.destroy()
})
