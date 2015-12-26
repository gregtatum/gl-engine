import Test         from 'tape'
import Normals      from 'normals'
import ReadPixel    from '../read-pixel'
import Cube          from 'primitive-cube'

import {
	Mesh,
	PerspectiveCamera,
	LitMaterial,
	NormalColorAugment,
	ForwardRenderer,
	Scene,
	Geometry,
} from '../../lib'

Test("Normal Color Lit Material", function(t) {

	var scene    = Scene({
		autoStart: false,
		renderer: ForwardRenderer({
			autoResizeCanvas : false,
			width: 100,
			height: 100
		})
	})
	
	var gl = scene.renderer.gl
	var camera   = PerspectiveCamera()
	var box = Cube(5,5,5)
	var geometry = Geometry( box )
	var mesh
	camera.transform.position[2] = 20
	var material = NormalColorAugment(	LitMaterial({ color : [1,0,0] }) )
	mesh = Mesh( geometry, material )
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
