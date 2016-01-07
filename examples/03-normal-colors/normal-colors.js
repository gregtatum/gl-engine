var Glam = require('glam')
var Bunny = require('bunny')
var Normals = require('normals')

Glam.Engine(function onReady( engine, scene ) {
	
	var camera = Glam.PerspectiveCamera()
	
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
	camera.position[2] = 20
	
	engine.on('update', function(e) {
		mesh.euler[1] = e.elapsed * 0.001
		mesh.euler[0] = Math.sin( e.elapsed * 0.0001 )
		scene.render( camera )
	})
	
})
