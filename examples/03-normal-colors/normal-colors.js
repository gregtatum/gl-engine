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

;(function drawNormalsBunny() {

	var scene    = Scene()
	var camera   = PerspectiveCamera()
	var normalMaterial = NormalColorAugment(LitMaterial)
	
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
	
	mesh.transform.position[1] = -5
	mesh.transform.position[2] = 0
	camera.transform.position[2] = 20
	
	scene.loop.on('update', function(e) {
		mesh.transform.euler[1] = e.elapsed * 0.001
		mesh.transform.euler[0] = Math.sin( e.elapsed * 0.0001 )
		scene.render( camera )
	})
	
})()
