//	Glam - A WebGL Rendering Engine: https://github.com/glamjs/glam
//	This demo shows off how to create a lit surface using directional lights and
//	a Lambert reflectance model.

var Box = require('geo-3d-box')
var Glam = require('glam')
var Vec3 = require('gl-vec3')
var CreateVignette = require('gl-vignette-background')
var Color = require('@tatumcreative/color')

Glam.Engine( function onReady( engine, scene ) {

	var camera = Glam.PerspectiveCamera()
	var lights = createLights( scene )

	scene.add( camera )
	createAndRenderBackground( engine.renderer )

	var thing = createThing( scene )
	var roots = scene.children( thing )
	var fingerlings = scene.getByType('fingerling')

	engine.on('update', function( event ) {
		camera.position[2] = 50
		camera.position[1] = 10
		// Now render the scene

		for( var i=0; i < fingerlings.length; i++ ) {	
			var mesh = fingerlings[i]

			mesh.euler[2] = (Math.sin( event.elapsed * 0.001 ) + 1) / 4
			mesh.euler[1] = Math.sin( event.elapsed * 0.0007 )
		}

		thing.euler[2] = event.elapsed * 0.0005
	
		for( var i=0; i < roots.length; i++ ) {	
			var root = roots[i]

			root.euler[0] = 0
			root.euler[1] = Math.sin( (2 * i / 5) * Math.PI )
			root.euler[2] = Math.PI * i / (5 / 2)
		}

		scene.render( camera )
	})
})

function createThing( scene ) {
	var simplicial = Box({ size: [1.2, 3, 1.2] })

	simplicial.positions.forEach(function( position ) {
		position[1] += 1.5
	})

	var geometry = Glam.Geometry( simplicial )
	var material = Glam.LitMaterial
	material = Glam.LambertAugment( material )
	material = Glam.FogAugment( material, {
		color : [0.5,0.5,0.5],
		near : 30,
		far: 100
	})
	
	var thing = Glam.Mesh()
	
	thing.euler[0] = -Math.PI / 2

	for( var j=0; j < 5; j++ ) {
		var node = thing
		for( var i=0; i < 100; i++ ) {
			node = createMesh( scene, node, geometry, material, i )
		}
	}
	
	
	scene.add( thing )
	
	return thing
}

function createMesh( scene, parent, geometry, makeMaterial, i ) {
	
	var material = makeMaterial()
	material.shading.lambert.diffuse = Color.hslToRgb([ (0.5 + i / 100) % 1, 1, 0.5 ])

	var mesh = Glam.Mesh( geometry, material )
	mesh.type.push('fingerling')
	mesh.position[1] = i > 0 ? 3 : 0
	mesh.scale[0] = 0.96
	mesh.scale[1] = 0.96
	mesh.scale[2] = 0.96
	scene.add( parent, mesh )
	
	return mesh
}

function createLights( scene ) {
	
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
	lights.forEach(function( light ) {
		Vec3.scale( light.color, light.color, 0.5 )
		scene.add( light )
	})
	
	return lights
}

function createAndRenderBackground( renderer ) {
	
	// Use gl-vignette-background to create a nice background
	
	var gl = renderer.gl
	var background = CreateVignette( gl )
	
	// Style the background
	background.style({
		color1: [0.45, 0.48, 0.5],
		color2: [0.0, 0.05, 0.1],
		smoothing: [ -0.5, 1.0 ],
		noiseAlpha: 0.01,
		offset: [ 0, -0.25 ],
	})
	
	// Use the beforerender event to render the background. This
	// hijacks the scene graph and allows gl-vignette-background to use its
	// own gl calls. Temporarily disable depth testing so that it will always
	// be behind the model.
	
	renderer.emitter.on('beforerender', function() {
		gl.disable( gl.DEPTH_TEST )
		background.draw()
		gl.enable( gl.DEPTH_TEST )
	})
}
