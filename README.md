# Glam

This project is an experimental ES6 WebGL engine built on [stack.gl](https://stack.gl/). It tries to combine the small-repo / big-repo philosophies together providing an easy to use environment. The API is built to be composable with the magnificent tools on NPM, while opinionated and centralized in a way to get things done quickly.

## Contribute code or thoughts?

Check this github issue out: [https://github.com/glamjs/glam/issues/1](https://github.com/glamjs/glam/issues/1)

## API Documentation

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
Then you will get a [spinning flat bunny](http://glamjs.github.io/glam/examples/01-hello-world/).

## Roadmap

| status | feature |
| ------ | ------- |
| done   | Basic working example with a flat material |
| done   | Basic documentation in place |
| done   | Basic testing setup |
| done   | Fog augmentation |
| todo   | Normal Color augmentation |
| todo   | Phong shading & directional lighting |
| todo   | Scene graph |
| todo   | Optimize and order shader calls |
| todo   | Travis CI |
| todo   | Live examples |
| todo   | And more |