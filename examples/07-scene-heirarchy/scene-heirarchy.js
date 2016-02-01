//	Glam - A WebGL Rendering Engine: https://github.com/glamjs/glam
//	This demonstrates how to work with a scene and parenting items

var CreateVignette = require('gl-vignette-background')
var Box = require('geo-3d-box')
var Glam = require('glam')
var Vec3 = require('gl-vec3')
var Color = require('@tatumcreative/color')

Glam.Engine(function onReady (engine, scene) {
  // Create the mesh with 5 lines of boxes
  var mesh = createMesh(scene)
  var rootMeshes = scene.children(mesh)
  var segments = scene.getByType('segment')

  // Setup the rest of the scene
  var camera = createCamera(scene)

  createLights(scene)
  createAndRenderBackground(engine.renderer)

  // The update/draw loop
  engine.on('update', function (event) {
    // Wave the lines segments around
    segments.forEach(function (segment) {
      segment.euler[2] = (Math.sin(event.elapsed * 0.001) + 1) / 4
      segment.euler[1] = Math.sin(event.elapsed * 0.0007)
    })

    // Make the roots of the lines wave around creepily
    rootMeshes.forEach(function (root, i) {
      root.euler[0] = 0
      root.euler[1] = Math.sin((2 * i / 5) * Math.PI)
      root.euler[2] = Math.PI * i / (5 / 2)
    })

    // Render the scene
    scene.render(camera)
  })
})

function createMesh (scene) {
  // Create a simplicial complex, a simple json object
  var simplicial = Box({ size: [1.2, 3, 1.2] })

  // Move the box up so the base is at the origin
  simplicial.positions.forEach(function (position) {
    position[1] += 1.5
  })

  // Turn the simplicial complex into a glam geometry
  var geometry = Glam.Geometry(simplicial)

  // Combine some augments to make a custom material factory function
  var makeMaterial = Glam.LambertAugment(Glam.LitMaterial)
  makeMaterial = Glam.FogAugment(makeMaterial, {
    color: [0.5, 0.5, 0.5],
    near: 30,
    far: 100
  })

  // Make the base mesh
  var mesh = Glam.Mesh()
  mesh.euler[0] = -Math.PI / 2

  // Make 5 lines of segments
  for (var j = 0; j < 5; j++) {
    var node = mesh

    // Each line has 100 segments, pass in the previous segment
    for (var i = 0; i < 100; i++) {
      node = createSegment(scene, node, geometry, makeMaterial, i)
    }
  }

  // Add the mesh to the scene
  scene.add(mesh)

  return mesh
}

function createSegment (scene, parent, geometry, makeMaterial, i) {
  // Make each material a slightly different color
  var material = makeMaterial()
  material.shading.lambert.diffuse = Color.hslToRgb([ (0.5 + i / 100) % 1, 1, 0.5 ])

  // Create the mesh
  var mesh = Glam.Mesh(geometry, material)

  // Add a custom type to the mesh, so it can be selected easier later on
  mesh.type.push('segment')

  // Offset the mesh, and scale it down
  mesh.position[1] = i > 0 ? 3 : 0
  mesh.scale[0] = 0.96
  mesh.scale[1] = 0.96
  mesh.scale[2] = 0.96

  // Finally parent the mesh in the scene graph to the previous mesh
  scene.add(parent, mesh)

  return mesh
}

function createCamera (scene) {
  var camera = Glam.PerspectiveCamera({
    far: 500
  })
    .use(Glam.OrbitControls, {
      distance: 50,
      target: [0, 10, 0]
    })

  camera.position[1] = 10
  scene.add(camera)

  return camera
}

function createLights (scene) {
  var lights = []

  lights[0] = Glam.DirectionalLight({
    color: [ 0.8, 0.5, 0.3 ],
    direction: [ 0.5, -0.5, 0.5 ]
  })
  lights[1] = Glam.DirectionalLight({
    color: [ 0.9, 0.9, 1.0 ],
    direction: [ 0.0, 1.0, 0.0 ]
  })
  lights[2] = Glam.DirectionalLight({
    color: [ 0.1, 0.3, 0.4 ],
    direction: [ -0.5, -0.3, 0.2 ]
  })

  // Scale down the color and add the lights
  lights.forEach(function (light) {
    Vec3.scale(light.color, light.color, 0.7)
    scene.add(light)
  })

  return lights
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
    noiseAlpha: 0.01,
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
