import Test from 'tape'
import ReadPixel  from '../read-pixel'

import Mesh        from "../../lib/mesh"
import Camera      from "../../lib/camera/perspective"
import LitMaterial from "../../lib/material/lit"
import Renderer    from "../../lib/renderer/forward"
import Scene       from "../../lib/scene"
import Geometry    from "../../lib/geometry"
import Normals     from 'normals'

import Box          from 'geo-3d-box'

Test("Lit Material", function(t) {

	var scene    = Scene({
		autoStart: false,
		renderer: Renderer({
			autoResizeCanvas : false,
			width: 100,
			height: 100
		})
	})
	var gl = scene.renderer.gl
	var camera   = Camera()
	var material = LitMaterial()
	var box = Box({size: 5})
	box.normals = Normals.vertexNormals( box.cells, box.positions )
	var geometry = Geometry( box )
	var mesh     = Mesh( geometry, material )

	scene.add( camera )
	scene.add( mesh )

	material.shading.color = [1,0,0]
	mesh.transform.position[2] = 0
	camera.position[2] = 20
	
	t.test("creates a scene with a red box", function(t) {
		t.plan(5)

		scene.render( camera )
		t.deepLooseEqual( ReadPixel( gl, 50, 50 ), [255, 0, 0], "The center is red" )
		t.deepLooseEqual( ReadPixel( gl, 35, 35 ), [255, 0, 0], "The top left is red" )
		t.deepLooseEqual( ReadPixel( gl, 65, 65 ), [255, 0, 0], "The bottom right is red" )
		t.deepLooseEqual( ReadPixel( gl, 30, 30 ), [255, 255, 255], "The top left outside is white" )
		t.deepLooseEqual( ReadPixel( gl, 70, 70 ), [255, 255, 255], "The bottom right outside is white" )
	})
	
	t.test("can change the box's color", function(t) {
		t.plan(5)
		
		material.shading.color = [0,1,1]
		scene.render( camera )
		
		t.deepLooseEqual( ReadPixel( gl, 50, 50 ), [0, 255, 255], "The center is cyan" )
		t.deepLooseEqual( ReadPixel( gl, 35, 35 ), [0, 255, 255], "The top left is cyan" )
		t.deepLooseEqual( ReadPixel( gl, 65, 65 ), [0, 255, 255], "The bottom right is cyan" )
		t.deepLooseEqual( ReadPixel( gl, 30, 30 ), [255, 255, 255], "The top left outside is white" )
		t.deepLooseEqual( ReadPixel( gl, 70, 70 ), [255, 255, 255], "The bottom right outside is white" )
		
	})
	
	
	t.test("the box can scale", function(t) {
		t.plan(5)
		
		material.shading.color = [255,0,255]
		mesh.transform.scale = [0.2, 0.2, 0.2]
		scene.render( camera )
		
		t.deepLooseEqual( ReadPixel( gl, 50, 50 ), [255, 0, 255], "The center is magenta" )
		t.deepLooseEqual( ReadPixel( gl, 48, 48 ), [255, 0, 255], "The top left is magenta" )
		t.deepLooseEqual( ReadPixel( gl, 52, 52 ), [255, 0, 255], "The bottom right is magenta" )
		t.deepLooseEqual( ReadPixel( gl, 45, 45 ), [255, 255, 255], "The top left outside is white" )
		t.deepLooseEqual( ReadPixel( gl, 55, 55 ), [255, 255, 255], "The bottom right outside is white" )
	
		scene.renderer.destroy()
	})
	
})
