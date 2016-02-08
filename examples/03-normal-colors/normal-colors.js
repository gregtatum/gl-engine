var Engine = require('gl-engine')
var Bunny = require('bunny')
var Normals = require('normals')

Engine.Engine(function onReady (engine, scene) {
  var camera = Engine.PerspectiveCamera()
    .use(Engine.OrbitControls, {
      distance: 20
    })

  var material = Engine.LitMaterial({
    color: [1, 0, 1]
  })
    .use(Engine.NormalColorAugment, {
      amount: 1
    })

  Bunny.normals = Normals.vertexNormals(Bunny.cells, Bunny.positions)

  var geometry = Engine.Geometry(Bunny)
  var mesh = Engine.Mesh(geometry, material)

  scene.add(camera)
  scene.add(mesh)

  mesh.position[1] = -5
  mesh.position[2] = 0
  camera.position[2] = 1

  engine.on('update', function (e) {
    scene.render(camera)
  })
})
