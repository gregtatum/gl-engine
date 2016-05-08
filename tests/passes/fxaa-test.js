import Test from 'tape'
import PixelTester from '../test-pixel'

import Mesh from '../../lib/mesh'
import Camera from '../../lib/camera/perspective'
import FlatMaterial from '../../lib/material/flat'
import Renderer from '../../lib/renderer/forward'
import Scene from '../../lib/scene'
import Geometry from '../../lib/geometry'
import Box from 'geo-3d-box'
import ScenePass from '../../lib/pass/scene'
import FXAAPass from '../../lib/pass/fxaa'
import MultipassRenderer from '../../lib/renderer/multipass'

Test('Scene Pass', function (t) {
  var scene = Scene({
    autoStart: false,
    renderer: Renderer({
      autoResizeCanvas: false,
      width: 100,
      height: 100
    })
  })
  var gl = scene.renderer.gl
  var camera = Camera()
  var material = FlatMaterial()
  var geometry = Geometry(Box({size: 5}))
  var mesh = Mesh(geometry, material)
  var testPixel = PixelTester(t, gl)

  scene.add(camera)
  scene.add(mesh)

  material.shading.color = [1, 0, 0]
  mesh.position[2] = 0
  mesh.euler[2] = Math.PI / 3
  camera.position[2] = 20

  t.test('creates a scene pass with a red box', function (t) {
    var multipass = MultipassRenderer(scene.renderer)
      .use(ScenePass({ scene: scene, camera: camera }))

    multipass.render(camera)

    testPixel(50, 50, [255, 0, 0], 'The center is red')
    testPixel(30, 50, [255, 0, 0], 'The edge is not smoothed')
    testPixel(20, 50, [255, 255, 255], 'The outside is white')

    multipass.use(FXAAPass())
    multipass.render(camera)

    testPixel(50, 50, [255, 0, 0], 'The center is red')
    testPixel(30, 50, [255, 128, 128], 'The edge is smoothed')
    testPixel(20, 50, [255, 255, 255], 'The outside is white')

    t.end()
    multipass.destroy()
    scene.renderer.destroy()
  })
})
