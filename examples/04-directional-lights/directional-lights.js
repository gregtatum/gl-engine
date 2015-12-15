var Bunny = require('bunny')
var Normals = require('normals')
var Glam = require('glam')
var Vec3 = require('gl-vec3')
var CreateVignette = require('gl-vignette-background')

// Simulate ES6 `import { ThingA, ThingB } from 'glam'`
var PerspectiveCamera  = Glam.PerspectiveCamera
var Geometry           = Glam.Geometry
var LitMaterial        = Glam.LitMaterial
var Mesh               = Glam.Mesh
var ForwardRenderer    = Glam.ForwardRenderer
var Scene              = Glam.Scene
var Transform          = Glam.Transform
var LambertAugment     = Glam.LambertAugment
var DirectionalLight   = Glam.DirectionalLight

;(function runImmediately() {

	var scene          = Scene()
	var renderer       = scene.renderer
	var gl             = renderer.gl
	var camera         = PerspectiveCamera()
	var mesh           = createBunnyMesh( scene )
	var lights         = createLights( scene )
	
	// Create and render the vignette background
	scene.on('beforerender', createBackground( renderer ) )
	
	scene.on('update', function( event ) {
		
		// Rotate the bunny mesh with the elapsed time
		mesh.transform.euler[1] = event.elapsed * 0.001
		mesh.transform.euler[0] = Math.sin( event.elapsed * 0.0001 )
		
		// Now render the scene with glam
		scene.render( camera )
	})
})()

function createLights( scene ) {
	
	var lights = []
	
	lights[0] = DirectionalLight({ color: [ 0.8, 0.5, 0.3 ], direction: [ 0.5, -0.5, 0.5 ] })
	lights[1] = DirectionalLight({ color: [ 0.9, 0.9, 1.0 ], direction: [ 0.0, 1.0, 0.0 ] })
	lights[2] = DirectionalLight({ color: [ 0.1, 0.3, 0.4 ], direction: [ -0.5, -0.3, 0.2 ] })
	
	lights.forEach(function( light ) {
		Vec3.scale( light.color, light.color, 0.5 )
		scene.add( light )
	})
	
	return lights
}

function createBunnyMesh( scene ) {
	
	var material =
		LitMaterial({
			color: [0.5,0.5,0.5] // Ambient color
		})
		.use( LambertAugment, {
			diffuse: [1,1,1]
		})

	Bunny.normals = Normals.vertexNormals(Bunny.cells, Bunny.positions)
	
	var geometry = Geometry( Bunny )
	var mesh     = Mesh( material, geometry )
	
	mesh.transform.position[1] = -5
	mesh.transform.position[2] = -20
	
	scene.add( mesh )
	
	return mesh
}

function createBackground( renderer ) {
	
	// Use gl-vignette-background to create a nice background
	
	var gl = renderer.gl
	var background = CreateVignette( gl )
	
	// Style the background
	background.style({
        color1: [0.45, 0.48, 0.5],
        color2: [0.0, 0.0, 0.0],
        smoothing: [ -0.5, 1.0 ],
        noiseAlpha: 0.1,
        offset: [ 0, -0.25 ],
	})
	
	// Return a function to use on the beforerender event. Temporarily
	// disable depth testing so that it will always be behind the model.
	return function() {
		gl.disable( gl.DEPTH_TEST )
		background.draw()
		gl.enable( gl.DEPTH_TEST )
	}
}
