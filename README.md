# Glam

This project is an experimental ES6 WebGL engine built on [stack.gl](https://stack.gl/). It tries to combine the small-repo / big-repo philosophies together providing an easy to use environment. The API is built to be composable with the magnificent tools on NPM, while opinionated and centralized in a way to get things done quickly.

## Contribute code or thoughts?

Check this github issue out: [https://github.com/glamjs/glam/issues/1](https://github.com/glamjs/glam/issues/1)

## Documentation and Getting Started

[Available here](https://github.com/glamjs/glam/tree/master/docs)

## Example Code

```javascript
import Bunny from 'bunny'
import {
	Mesh, PerspectiveCamera, FlatMaterial, Scene, Geometry, Engine,
} from 'glam'

Engine(function onReady( engine, scene ) {
	
	var camera   = PerspectiveCamera()
	var material = FlatMaterial({ color : [0.1,0.3,0.4] })
	var geometry = Geometry( Bunny )
	var mesh     = Mesh( geometry, material )

	scene.add( mesh )

	mesh.position[1] = -5
	mesh.position[2] = 0
	camera.position[2] = 20

	engine.on('update', function(e) {
		mesh.euler[0] = e.elapsed * 0.0001
		mesh.euler[1] = e.elapsed * 0.001
		scene.render( camera )
	})
})
```
Then you will get a [spinning flat bunny](http://requirebin.com/?gist=TatumCreative/40970c039f8c0ce44ae2).

## Live Examples

* [Hello World Bunny](http://requirebin.com/?gist=TatumCreative/40970c039f8c0ce44ae2)
* [Fog Material](http://requirebin.com/?gist=TatumCreative/c96e48648794a7565fcc)
* [Normal Colors Material](http://requirebin.com/?gist=TatumCreative/0c3c74675d0433d1daa1)
* [Directional Lights](http://requirebin.com/?gist=TatumCreative/762537ae57a22225c431)
* [Lit Wireframe](http://requirebin.com/?gist=TatumCreative/4e8ac0bdeda22c4d62a9)


## Roadmap

 * Camera improvements & controls
 * Phong shading
 * Optimize and order shader calls
 * Textures
 * Travis CI
 * Live examples
 * Morphs
 * Skeletons
 * Post Processing
 * And more...

## Completed Featured

 * Scene graph
 * Cache and share shaders
 * Lambert shading
 * Directional lighting
 * Normal Color augmentation
 * Fog augmentation
 * Basic testing setup
 * Basic documentation in place
 * Basic working example with a flat material
