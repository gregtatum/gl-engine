var Glam = require('glam')
var Bunny = require('bunny')

var Mesh              = Glam.Mesh
var PerspectiveCamera = Glam.PerspectiveCamera
var FlatMaterial      = Glam.FlatMaterial
var Scene             = Glam.Scene
var Geometry          = Glam.Geometry

;(function main() {
	
	var scene    = Scene()
	var camera   = PerspectiveCamera()
	var material = FlatMaterial({ color : [0.1,0.3,0.4] })
	var geometry = Geometry( Bunny )
	var mesh     = Mesh( material, geometry )

	scene.add( mesh )

	mesh.transform.position[1] = -5
	mesh.transform.position[2] = 0
	camera.transform.position[2] = 20

	scene.loop.on('update', function(e) {
	    mesh.transform.euler[0] = e.elapsed * 0.0001
	    mesh.transform.euler[1] = e.elapsed * 0.001
	    scene.render( camera )
	})
	
})()
