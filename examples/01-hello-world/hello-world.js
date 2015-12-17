var Glam = require('glam')
var Bunny = require('bunny')

var Mesh              = Glam.Mesh
var PerspectiveCamera = Glam.PerspectiveCamera
var FlatMaterial      = Glam.FlatMaterial
var Scene             = Glam.Scene
var Geometry          = Glam.Geometry

;(function runImmediately() {
	
	var scene    = Scene()
	var camera   = PerspectiveCamera()
	var material = FlatMaterial({ color : [0.1,0.3,0.4] })
	var geometry = Geometry( Bunny )
	var mesh     = Mesh( material, geometry )

	scene.add( mesh )

	mesh.position[1] = -5
	mesh.position[2] = 0
	camera.position[2] = 20

	scene.loop.on('update', function(e) {
	    mesh.euler[0] = e.elapsed * 0.0001
	    mesh.euler[1] = e.elapsed * 0.001
	    scene.render( camera )
	})
	
})()
