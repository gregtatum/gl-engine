var Engine = require('gl-engine')
var Bunny = require('bunny')

Engine.Engine(function onReady (engine, scene) {
  var camera = Engine.PerspectiveCamera()
  var material = Engine.FlatMaterial({ color: [0.1, 0.3, 0.4] })
  var geometry = Engine.Geometry(Bunny)
  var mesh = Engine.Mesh(geometry, material)

  scene.add(camera)
  scene.add(mesh)

  mesh.position[1] = -5
  mesh.position[2] = 0
  camera.position[2] = 20

  engine.on('update', function (e) {
    mesh.euler[0] = e.elapsed * 0.0001
    mesh.euler[1] = e.elapsed * 0.001
    scene.render(camera)
  })
})
