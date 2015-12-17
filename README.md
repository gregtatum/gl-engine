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
	Mesh,
	PerspectiveCamera,
	FlatMaterial,
	Scene,
	Geometry,
} from 'glam'

var scene    = Scene()
var camera   = PerspectiveCamera()
var material = FlatMaterial({ color : [0.1,0.3,0.4] })
var geometry = Geometry( Bunny )
var mesh     = Mesh( material, geometry )

scene.add( mesh )

mesh.transform.position[1] = -5
mesh.transform.position[2] = 0
camera.transform.position[2] = 20

scene.loop.on('update', function(e) {
	mesh.transform.euler[0] = e.elapsed * 0.0001
	mesh.transform.euler[1] = e.elapsed * 0.001
	scene.render( camera )
})
```
Then you will get a [spinning flat bunny](http://requirebin.com/?gist=TatumCreative/40970c039f8c0ce44ae2).

## Roadmap

Right now all the changes are going to be minor releases, until a 1.0.0 bump when things are in a bit more stable shape.

| status | feature |
| ------ | ------- |
| done   | Basic working example with a flat material |
| done   | Basic documentation in place |
| done   | Basic testing setup |
| done   | Fog augmentation |
| done   | Normal Color augmentation |
| done   | Directional lighting |
| done   | Lambert shading |
| todo   | Phong shading |
| todo   | Scene graph |
| todo   | Optimize and order shader calls |
| todo   | Textures |
| todo   | Travis CI |
| todo   | Live examples |
| todo   | And more... morphs, skeletons, post processing... |