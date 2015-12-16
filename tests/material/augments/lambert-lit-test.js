import Test       from 'tape'
import Normals    from 'normals'
import ReadPixel  from '../read-pixel'
import Cube       from 'primitive-cube'

import {
	Mesh,
	PerspectiveCamera,
	LitMaterial,
	LambertAugment,
	ForwardRenderer,
	Scene,
	Geometry,
	DirectionalLight,
} from "../../../lib"

Test("Lambert Lit Augmentation", function(t) {

	var scene    = Scene({
		renderer: ForwardRenderer({
			autoResizeCanvas : false,
			width: 100,
			height: 100
		})
	})
	
	var gl       = scene.renderer.gl
	var camera   = PerspectiveCamera()
	var geometry = Geometry( Cube(5,5,5) )

	var material =
		LitMaterial({
			color: [51/255, 0, 0] // Ambient color
		})
		.use( LambertAugment, {
			diffuse: [1,1,1]
		})
	
	var mesh     = Mesh( material, geometry )
	
	var whiteLight = DirectionalLight({ color: [ 1, 1, 1 ], direction: [ 1, 0, 0 ] })
	var redLight   = DirectionalLight({ color: [ 1, 0, 0 ], direction: [ -1, 0, 0 ] })

	camera.transform.position[2] = 20
	mesh.transform.euler[1] = Math.PI * 0.25
	scene.add( mesh )
	
	t.test("no lights renders the ambient color", function(t) {
		t.plan(3)
		
		scene.render( camera )
		
		t.deepLooseEqual( ReadPixel( gl, 50, 50 ), [51, 0, 0], "The center is dark red" )
		t.deepLooseEqual( ReadPixel( gl, 35, 50 ), [51, 0, 0], "The left is dark red" )
		t.deepLooseEqual( ReadPixel( gl, 65, 50 ), [51, 0, 0], "The right is dark red" )
	})
	
	t.test("the box is affected by a single light", function(t) {
		t.plan(2)

		scene.add( whiteLight )
		scene.render( camera )
		
		t.deepLooseEqual( ReadPixel( gl, 35, 50 ), [51, 0, 0], "The left is black" )
		t.deepLooseEqual( ReadPixel( gl, 65, 50 ), [231, 180, 180], "The right is pink" )
	})
	
	
	t.test("the box is affected by a single light", function(t) {
		t.plan(2)

		scene.add( redLight )
		scene.render( camera )
		
		t.deepLooseEqual( ReadPixel( gl, 35, 50 ), [231, 0, 0], "The left is red" )
		t.deepLooseEqual( ReadPixel( gl, 65, 50 ), [231, 180, 180], "The right is pink" )
		
		scene.renderer.destroy()
	})
})