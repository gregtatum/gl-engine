var Bunny = require('bunny')
var Normals = require('normals')
var Glam = require('glam')

var PerspectiveCamera  = Glam.PerspectiveCamera
var Geometry           = Glam.Geometry
var LitMaterial        = Glam.LitMaterial
var Mesh               = Glam.Mesh
var ForwardRenderer    = Glam.ForwardRenderer
var Scene              = Glam.Scene
var Transform          = Glam.Transform
var NormalColorAugment = Glam.NormalColorAugment

;(function runImmediately() {

	var scene    = Scene()
	var camera   = PerspectiveCamera()
	
	var material = LitMaterial({
			color: [1,0,1]
		})
		.use( NormalColorAugment, {
			amount : 1
		})

	Bunny.normals = Normals.vertexNormals(Bunny.cells, Bunny.positions)
	
	var geometry = Geometry( Bunny )
	var mesh     = Mesh( material, geometry )

	scene.add( mesh )
	
	mesh.position[1] = -5
	mesh.position[2] = 0
	camera.position[2] = 20
	
	scene.loop.on('update', function(e) {
		mesh.euler[1] = e.elapsed * 0.001
		mesh.euler[0] = Math.sin( e.elapsed * 0.0001 )
		scene.render( camera )
	})
	
})()
