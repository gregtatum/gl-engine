import Box        from 'geo-3d-box'
import Bunny      from 'bunny'

import {
	PerspectiveCamera,
	Geometry,
	FlatMaterial,
	Mesh,
	StraightRenderer,
	Scene,
	Transform,
	FogAugment
} from "../../lib"

var FogMaterial = FogAugment(FlatMaterial)

;(function drawCube() {
	
	var scene    = Scene()
	var camera   = PerspectiveCamera()
	var material = FogMaterial()
	// var geometry = Geometry( Box({size: 5}) )
	var geometry = Geometry( Bunny )
	var mesh     = Mesh( material, geometry )

	scene.add( mesh )
	
	material.shading.color = [0.5,0.3,0.4]
	mesh.transform.position[1] = -5
	mesh.transform.position[2] = 0
	camera.transform.position[2] = 20
	
	scene.loop.on('update', function(e) {
		mesh.transform.euler[1] = e.elapsed * 0.001
		mesh.transform.euler[0] = e.elapsed * 0.0001
		scene.render( camera )
	})
	
})()
