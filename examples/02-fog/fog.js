var Engine = require('gl-engine')
var Bunny = require('bunny')

Engine.Engine(function onReady (engine, scene) {
  var material = Engine.FlatMaterial({ color: [0.5, 0.3, 0.4] })
    .use(Engine.FogAugment, {
      near: 15,
      far: 25,
      color: [1, 1, 1]
    })

  var mesh = Engine.Mesh(Engine.Geometry(Bunny), material)

  var camera = Engine.PerspectiveCamera()
    .use(Engine.OrbitControls, {
      distance: 20
    })

  scene.add(camera)
  scene.add(mesh)

  mesh.position[1] = -5
  mesh.position[2] = 0
  camera.position[2] = 20

  engine.on('update', function (e) {
    scene.render(camera)
  })
})
