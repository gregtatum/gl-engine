import Test from 'tape'
import Normals      from 'normals'
import ReadPixel  from '../read-pixel'

import Mesh              from "../../../lib/mesh"
import Camera            from "../../../lib/camera/perspective"
import LitMaterial       from "../../../lib/material/lit"
import LambertAugment    from "../../../lib/material/augment/lambert"
import Renderer          from "../../../lib/renderer/forward"
import Scene             from "../../../lib/scene"
import Geometry          from "../../../lib/geometry"
import Box               from 'geo-3d-box'
import DirectionalLight  from "../../../lib/lights/directional"

Test("Lambert Augmentation", function(t) {

	var scene    = Scene({
		renderer: Renderer({
			autoResizeCanvas : false,
			width: 100,
			height: 100
		})
	})
	
	var gl       = scene.renderer.gl
	var camera   = Camera()
	var box      = Box({size: 5}); box.normals = Normals.vertexNormals( box.cells, box.positions )
	var geometry = Geometry( box )

	var material = LambertAugment( LitMaterial({ color : [0.5,0.5,0.5] }) )
	var mesh     = Mesh( material, geometry )
	
	var whiteLight = DirectionalLight({ color: [ 1, 1, 1 ], direction: [ 0, 1, 0 ] })
	var redLight   = DirectionalLight({ color: [ 1, 0, 0 ], direction: [ -1, 0, 0 ] })

	camera.transform.position[2] = 20
	mesh.transform.euler[1] = Math.PI * 0.25
	scene.add( mesh )
	
	t.test("no lights renders a box black", function(t) {
		t.plan(3)
		
		scene.render( camera )
		
		t.deepLooseEqual( ReadPixel( gl, 50, 50 ), [0, 0, 0], "The center is black" )
		t.deepLooseEqual( ReadPixel( gl, 35, 50 ), [0, 0, 0], "The left is black" )
		t.deepLooseEqual( ReadPixel( gl, 65, 50 ), [0, 0, 0], "The right is black" )
	})
	
	t.test("the box is affected by a single light", function(t) {
		t.plan(3)

		scene.add( whiteLight )
		scene.render( camera )
		debugger
		
		t.deepLooseEqual( ReadPixel( gl, 35, 50 ), [0, 0, 0], "The left is black" )
		t.deepLooseEqual( ReadPixel( gl, 65, 50 ), [0.5, 0.5, 0.5], "The right is grey" )

		debugger
		
	})
	
	//		scene.renderer.destroy()

})