import Test         from 'tape'
import Normals      from 'normals'
import ReadPixel    from '../read-pixel'

import Mesh         from "../../../lib/mesh"
import Camera       from "../../../lib/camera/perspective"
import LitMaterial  from "../../../lib/material/lit"
import NormalColor  from "../../../lib/material/augment/normal-color"
import Renderer     from "../../../lib/renderer/forward"
import Scene        from "../../../lib/scene"
import Geometry     from "../../../lib/geometry"
import Box          from 'primitive-cube'

Test("Normal Color Material", function(t) {

	var scene    = Scene({
		renderer: Renderer({
			autoResizeCanvas : false,
			width: 100,
			height: 100
		})
	})
	
	var gl = scene.renderer.gl
	var camera   = Camera()
	var box = Box(5,5,5)
	var geometry = Geometry( box )
	var mesh
	camera.transform.position[2] = 20
	var material = NormalColor(	LitMaterial({ color : [1,0,0] }) )
	mesh = Mesh( material, geometry )
	scene.add( mesh )
	
	
	t.plan(5)

	mesh.transform.euler[1] = 0
	scene.render( camera )

	t.deepLooseEqual( ReadPixel( gl, 50, 50 ), [127, 127, 255], "The box's side is purplish." )

	mesh.transform.euler[1] = Math.PI * 0.25
	scene.render( camera )
	
	t.deepLooseEqual( ReadPixel( gl, 40, 50 ), [ 0, 127, 127 ], "The left is green" )
	t.deepLooseEqual( ReadPixel( gl, 60, 50 ), [ 127, 127, 255 ], "The box's side is purplish" )
	
	camera.transform.position[2] = -20
	camera.transform.euler[1] = Math.PI
	
	t.deepLooseEqual( ReadPixel( gl, 40, 50 ), [ 0, 127, 127 ], "The left is green" )
	t.deepLooseEqual( ReadPixel( gl, 60, 50 ), [ 127, 127, 255 ], "The box's side is purplish" )
	
	scene.renderer.destroy()
	
})