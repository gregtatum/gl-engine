import Test from 'tape'
import ReadPixel from '../read-pixel'
import Cube from 'geo-3d-box'

import {
  Mesh,
  PerspectiveCamera,
  LitMaterial,
  NormalColorAugment,
  ForwardRenderer,
  Scene,
  Geometry
} from '../../lib'

Test('Normal Color Lit Material', function (t) {
  var scene = Scene({
    autoStart: false,
    renderer: ForwardRenderer({
      autoResizeCanvas: false,
      width: 100,
      height: 100
    })
  })

  var gl = scene.renderer.gl
  var camera = PerspectiveCamera()
  var box = Cube({size: 5})
  var geometry = Geometry(box)
  var mesh
  var material = NormalColorAugment(LitMaterial({ color: [1, 0, 0] }))

  camera.position[2] = 20
  mesh = Mesh(geometry, material)
  scene.add(camera)
  scene.add(mesh)

  t.plan(5)

  mesh.transform.euler[1] = 0
  scene.render(camera)

  t.deepLooseEqual(ReadPixel(gl, 50, 50), [127, 127, 255], "The box's side is purplish1.")

  mesh.transform.euler[1] = Math.PI * 0.25
  scene.render(camera)

  t.deepLooseEqual(ReadPixel(gl, 40, 50), [ 37, 127, 218 ], 'The left is green')
  t.deepLooseEqual(ReadPixel(gl, 60, 50), [ 218, 127, 218 ], "The box's side is purplish2")

  camera.position[2] = -20
  camera.lookAt([0, 0, 0])
  scene.render(camera)

  t.deepLooseEqual(ReadPixel(gl, 40, 50), [ 37, 127, 218 ], 'The left is green')
  t.deepLooseEqual(ReadPixel(gl, 60, 50), [ 218, 127, 218 ], "The box's side is purplish3")

  scene.renderer.destroy()
})
