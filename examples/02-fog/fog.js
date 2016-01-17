var Glam = require('glam')
var Bunny = require('bunny')

Glam.Engine(function onReady (engine, scene) {
  var material = Glam.FlatMaterial({ color: [0.5, 0.3, 0.4] })
    .use(Glam.FogAugment, {
      near: 15,
      far: 25,
      color: [1, 1, 1]
    })

  var mesh = Glam.Mesh(Glam.Geometry(Bunny), material)

  var camera = Glam.PerspectiveCamera()
    .use(Glam.OrbitControls, {
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
