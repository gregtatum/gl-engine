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
import BloomPass from '../../lib/pass/bloom'
import MultipassRenderer from '../../lib/renderer/multipass'

Test('Bloom Pass', function (t) {
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
  var redMaterial = FlatMaterial()
  var blackMaterial = FlatMaterial()
  var geometry = Geometry(Box({size: 5}))
  var redMesh = Mesh(geometry, redMaterial)
  var blackMesh = Mesh(geometry, blackMaterial)
  var testPixel = PixelTester(t, gl)
  var multipass = MultipassRenderer(scene.renderer)
    .use(ScenePass({ scene: scene, camera: camera }))
    .use(BloomPass({
      intensity: 10,
      kernelSize: 0.3,
      power: 2
    }))

  scene.add(camera)
  scene.add(redMesh)
  scene.add(blackMesh)

  redMaterial.shading.color = [1, 0, 0]
  redMesh.position[2] = 0
  blackMaterial.shading.color = [0, 0, 0.5]
  blackMesh.position[2] = -1
  blackMesh.scale[0] = 4
  blackMesh.scale[1] = 4
  camera.position[2] = 20

  t.test('creates a scene pass with a red box', function (t) {
    multipass.render(camera)

    testPixel(50, 50, [255, 0, 0], 'The center is red')
    testPixel(35, 35, [255, 0, 169], 'The top left has some background in it')
    testPixel(65, 65, [255, 0, 147], 'The bottom right is red')
    testPixel(50, 30, [169, 0, 255], 'There is a bit of red blur at the top edge')
    testPixel(50, 80, [79, 0, 255], 'There is a bit of red blur at the bottom edge')
    testPixel(30, 50, [169, 0, 255], 'there is a bit of red blur at the left edge')
    testPixel(80, 50, [79, 0, 255], 'there is a bit of red blur at the right edge')
    testPixel(2, 2, [0, 0, 255], 'The top left outside is blue')
    testPixel(98, 98, [0, 0, 255], 'The bottom right outside is blue')

    t.end()

    multipass.destroy()
    scene.renderer.destroy()
  })
})
