import Test         from 'tape'
import Normals      from 'normals'
import ReadPixel    from '../read-pixel'
import Cube          from 'primitive-cube'

import {
	Mesh,
	PerspectiveCamera,
	LitMaterial,
	FogAugment,
	ForwardRenderer,
	Scene,
	Geometry,
} from '../../lib'

Test("Fog Lit Augmentation", function(t) {

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
	box.normals = Normals.vertexNormals( box.cells, box.positions )
	var geometry = Geometry( box )
	var mesh
	camera.transform.position[2] = 20
	
	
	t.test("the red box is affected by dark fog", function(t) {
		t.plan(3)
		
		var material = FogAugment(
			LitMaterial({ color : [1,0,0] }),
			{
				near : 10,
				far : 30,
				color : [0,0,0]
			}
		)
		mesh = Mesh( geometry, material )
		mesh.transform.euler[1] = Math.PI * 0.25
		scene.add( mesh )
		scene.render( camera )
		
		t.deepLooseEqual( ReadPixel( gl, 50, 50 ), [169, 0, 0], "The center is mostly red" )
		t.deepLooseEqual( ReadPixel( gl, 35, 50 ), [139, 0, 0], "The left is darker" )
		t.deepLooseEqual( ReadPixel( gl, 65, 50 ), [137, 0, 0], "The right is darker" )
		
	})
	
	t.test("the red box is affected by light fog", function(t) {
		t.plan(3)
		
		mesh.material.shading.fog.color = [1,1,1]
		scene.render( camera )
		
		t.deepLooseEqual( ReadPixel( gl, 50, 50 ), [255, 86, 86], "The center is mostly red" )
		t.deepLooseEqual( ReadPixel( gl, 35, 50 ), [255, 116, 116], "The left is lighter" )
		t.deepLooseEqual( ReadPixel( gl, 65, 50 ), [255, 118, 118], "The right is darker" )
		
		scene.renderer.destroy()
	})
	
})
