# Glam

This project is an experimental ES6 WebGL engine built on [stack.gl](https://stack.gl/). It tries to combine the small-repo / big-repo philosophies together providing an easy to use environment. The API is built to be composable with the magnificent tools on NPM, while opinionated and centralized in a way to get things done quickly. It's built to be friendly for new users to hack on right away, but provide the raw power needed for expert uses. Shader code will be a first class citizen in the API.

## Dive In

* [Getting Started and Installing](https://github.com/glamjs/glam/tree/master/docs/getting-started.md)
* [Examples](https://github.com/glamjs/glam/tree/master/docs/examples.md)
* [API Documentation](https://github.com/glamjs/glam/tree/master/docs)

## Example Code

```javascript
import Bunny from 'bunny'
import { Mesh, PerspectiveCamera, FlatMaterial, Scene, Geometry, Engine } from 'glam'

Engine(function onReady( engine, scene ) {
	
	var camera   = PerspectiveCamera()
	var material = FlatMaterial({ color : [0.1,0.3,0.4] })
	var geometry = Geometry( Bunny )
	var mesh     = Mesh( geometry, material )

	scene.add( camera )
	scene.add( mesh )

	mesh.position[1] = -5
	camera.position[2] = 20

	engine.on('update', function(e) {
		mesh.euler[0] = e.elapsed * 0.0001
		mesh.euler[1] = e.elapsed * 0.001
		scene.render( camera )
	})
})
```
Then you will get a [spinning flat bunny](http://requirebin.com/?gist=TatumCreative/40970c039f8c0ce44ae2).

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

## Completed Features

 * Scene graph
 * Cache and share shaders
 * Lambert shading
 * Directional lighting
 * Normal Color augmentation
 * Fog augmentation
 * Basic testing setup
 * Basic documentation in place
 * Basic working example with a flat material
