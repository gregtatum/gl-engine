var Glam = require('glam')
var Bunny = require('bunny')
var Normals = require('normals')

Glam.Engine(function onReady( engine, scene ) {
	
	var camera = Glam.PerspectiveCamera()
		.use( Glam.OrbitControls, {
			distance: 20
		})
	
	var material = Glam.LitMaterial({
			color: [1,0,1]
		})
		.use( Glam.NormalColorAugment, {
			amount : 1
		})
	
	Bunny.normals = Normals.vertexNormals(Bunny.cells, Bunny.positions)
	
	var geometry = Glam.Geometry( Bunny )
	var mesh     = Glam.Mesh( geometry, material )

	scene.add( camera )
	scene.add( mesh )
	
	mesh.position[1] = -5
	mesh.position[2] = 0
	camera.position[2] = 1
	
	engine.on('update', function(e) {
		scene.render( camera )
	})
})
