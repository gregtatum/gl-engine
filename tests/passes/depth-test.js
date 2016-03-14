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
import DepthPass from '../../lib/pass/depth'
import MultipassRenderer from '../../lib/renderer/multipass'

Test('Depth Pass', function (t) {
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
  var nearMesh = Mesh(geometry, material)
  var farMesh = Mesh(geometry, material)
  var testPixel = PixelTester(t, gl)
  var multipass = MultipassRenderer(scene.renderer)
    .use(ScenePass({ scene: scene, camera: camera }))
    .use(DepthPass())

  scene.add(camera)
  scene.add(nearMesh)
  scene.add(farMesh)

  nearMesh.position[2] = 0
  farMesh.position[2] = -1
  farMesh.scale[0] = 4
  farMesh.scale[1] = 4
  camera.position[2] = 20

  t.test('creates a scene pass with a red box', function (t) {
    multipass.render(camera)

    testPixel(50, 50, [96, 96, 96], 'The center is red')
    testPixel(35, 35, [96, 96, 96], 'The top left is red')
    testPixel(65, 65, [96, 96, 96], 'The bottom right is red')
    testPixel(30, 30, [103, 103, 103], 'The top left outside is white')
    testPixel(70, 70, [103, 103, 103], 'The bottom right outside is white')

    t.end()

    multipass.destroy()
    scene.renderer.destroy()
  })
})
