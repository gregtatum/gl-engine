import Test from 'tape'
import Renderer   from "../../lib/renderer/straight"
import Box        from 'geo-3d-box'

Test("Straight Renderer", function(t) {
	
	t.test("Adds a canvas", function(t) {
		t.plan(3)

		let renderer = Renderer()
		let canvases = document.querySelectorAll('canvas')
		
		t.equals( canvases.length, 1, "It auto-creates a canvas" )
		t.equals( renderer.canvas, canvases[0], "It added the canvas to the DOM" )
		
		renderer.destroy()
		
		let canvasesAfter = document.querySelectorAll('canvas')
		
		t.equals( canvasesAfter.length, 0, "It destroys the canvas" )
		
	})
	
	t.test("Can be passed a canvas", function(t) {
		t.plan(3)
		
		let canvas = document.createElement('canvas')
		let renderer = Renderer({
			canvas : canvas,
			autoAddCanvas : false
		})
		let canvasesEmpty = document.querySelectorAll('canvas')

		t.equals( canvasesEmpty.length, 0, "It does not auto-create or add a canvas" )
		t.equals( renderer.canvas, canvas, "It does set the canvas as the current" )
		
		document.body.appendChild( canvas )
		
		renderer.destroy()
		
		let canvasesAfter = document.querySelectorAll('canvas')
		
		t.equals( canvasesAfter.length, 1, "It does not destroy the canvas" )
		
	})
	
	t.test("It does resize the canvas", function(t) {
		
		t.plan(6)
		let div = document.createElement('div')
		
		div.style.width = "100px"
		div.style.height = "50px"
		
		document.body.appendChild( div )
		
		let renderer = Renderer({
			parentEl : div
		})
		
		t.equals( renderer.canvas.width, 100, "canvas is initially sized" )
		t.equals( renderer.canvas.height, 50, "canvas is initially sized" )
		
		div.style.width = "66px"
		div.style.height = "33px"
		
		window.dispatchEvent( new Event('resize') )
		
		t.equals( renderer.canvas.width, 66, "canvas gets resized on window resize" )
		t.equals( renderer.canvas.height, 33, "canvas gets resized on window resize" )
		
		renderer.destroy()
		
		div.style.width = "55px"
		div.style.height = "44px"
		
		window.dispatchEvent( new Event('resize') )
		
		t.equals( renderer.canvas.width, 66, "canvas does not resize after destroying the renderer" )
		t.equals( renderer.canvas.height, 33, "canvas does not resize after destroying the renderer" )
		
	})
	
	t.test("It can set the canvas size", function(t) {
		t.plan(2)
		
		let renderer = Renderer({
			autoResizeCanvas: false,
			width : 77,
			height : 55
		})
		
		t.equals( renderer.canvas.width, 77, "canvas width is correct" )
		t.equals( renderer.canvas.height, 55, "canvas height is correct" )
		
		renderer.destroy()
	})
})