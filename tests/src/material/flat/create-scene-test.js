import Mesh       from "../../../src/mesh"
import Camera     from "../../../src/camera/perspective"
import Material   from "../../../src/material/flat"
import Scene      from "../../../src/scene"
import Geometry   from "../../../src/geometry"
import Box        from 'geo-3d-box'

export default function createScene( material ) {
	
	var scene    = Scene()
	var camera   = Camera()
	var material = material || Material()
	var geometry = Geometry( Box({size: 5}) )
	var mesh     = Mesh( material, geometry )

	scene.add( mesh )

	material.shading.color = [1,0,0]
	mesh.transform.position[2] = 0
	camera.transform.position[2] = 20
	
	return {
		scene    : scene,
		renderer : scene.renderer,
		camera   : camera,
		material : material,
		geometry : geometry,
		mesh     : mesh,
		canvas   : scene.renderer.canvas,
	}
}