import Mesh       from "../../../lib/mesh"
import Camera     from "../../../lib/camera/perspective"
import Material   from "../../../lib/material/flat"
import Scene      from "../../../lib/scene"
import Geometry   from "../../../lib/geometry"
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