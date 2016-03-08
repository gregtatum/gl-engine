var Bunny = require('bunny')
var Normals = require('normals')
var Engine = require('gl-engine')
var Vec3 = require('gl-vec3')
var CreateVignette = require('gl-vignette-background')
var dat = require('dat-gui')

Engine.Engine(function onReady (engine, scene) {
  var camera = Engine.PerspectiveCamera()
    .use(Engine.OrbitControls, {
      distance: 20,
      phi: 1.2,
      theta: 0.3
    })

  scene.add(camera)

  var meshes = createBunnyMeshes(scene, 10)
  createLights(scene)
  createAndRenderBackground(engine.renderer)

  var gui = new dat.GUI();

  var multipass = MultipassRenderer(scene.renderer)
    .use(ScenePass({ scene: scene, camera: camera }))
    .use(DepthOfFieldPass({gui: gui}))
    .use(BloomPass({gui: gui}))

  engine.on('update', function (event) {
    multipass.render(camera)
  })

})

function createLights (scene) {
  var lights = []

  lights[0] = Engine.DirectionalLight({
    color: [ 0.3, 0.5, 0.8 ],
    direction: [ 0.5, -0.5, 0.5 ]
  })
  lights[1] = Engine.DirectionalLight({
    color: [ 1.0, 0.9, 0.8 ],
    direction: [ 0.0, 1.0, 0.0 ]
  })
  // lights[2] = Engine.DirectionalLight({
  //   color: [ 0.1, 0.3, 0.4 ],
  //   direction: [ -0.5, -0.3, 0.2 ]
  // })

  // Scale down the color and add the lights
  lights.forEach(function (light) {
    Vec3.scale(light.color, light.color, 0.8)
    scene.add(light)
  })

  return lights
}

function createBunnyMeshes (scene, count) {
  // Create the bunny mesh, which is a collection of a geometry and material.

  // Set up a lit material with the lambert reflectance model
  var material =
  Engine.LitMaterial()
    .use(Engine.LambertAugment, {
      diffuse: [1, 1, 1]
    })

  // Our bunny model didn't come with normals, so add them here
  Bunny.normals = Normals.vertexNormals(Bunny.cells, Bunny.positions)

  // Feed the bunny 	"simplicial complex" into a gl-engine geometry
  var geometry = Engine.Geometry(Bunny)

  var meshes = []
  for (var i=0; i < count; i++) {
    var mesh = Engine.Mesh(geometry, material)
    mesh.position[0] = Math.random() * 3
    mesh.position[1] = -5
    mesh.position[2] = -10 * i + 10
    mesh.euler[1] = Math.random() * Math.PI * 2
    scene.add(mesh)
    meshes.push(mesh)
  }

  return meshes
}

function createAndRenderBackground (renderer) {
  // Use gl-vignette-background to create a nice background

  var gl = renderer.gl
  var background = CreateVignette(gl)

  // Style the background
  background.style({
    color1: [0.45, 0.48, 0.5],
    color2: [0.0, 0.05, 0.1],
    smoothing: [ -0.5, 1.0 ],
    noiseAlpha: 0.1,
    offset: [ 0, -0.25 ]
  })

  // Use the beforerender event to render the background. This
  // hijacks the scene graph and allows gl-vignette-background to use its
  // own gl calls. Temporarily disable depth testing so that it will always
  // be behind the model.

  renderer.emitter.on('beforerender', function () {
    gl.disable(gl.DEPTH_TEST)
    background.draw()
    gl.enable(gl.DEPTH_TEST)
  })
}
