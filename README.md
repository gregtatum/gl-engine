# Glam

This project is an experimental ES6 WebGL engine built on [stack.gl](https://stack.gl/). It tries to combine the small-repo / big-repo philosophies together providing an easy to use environment. The API is built to be composable with the magnificent tools on NPM, while opinionated and centralized in a way to get things done quickly.

## Contribute code or thoughts?

Check this github issue out: [https://github.com/glamjs/glam/issues/1](https://github.com/glamjs/glam/issues/1)

## API Documentation

[Available here](https://github.com/glamjs/glam/tree/master/docs)

## Example Code

```javascript
import Mesh       from "glam/lib/mesh"
import Camera     from "glam/lib/camera/perspective"
import Material   from "glam/lib/material/flat"
import Scene      from "glam/lib/scene"
import Geometry   from "glam/lib/geometry"
import Bunny      from 'bunny'

var scene    = Scene()
var camera   = Camera()
var material = Material()
var geometry = Geometry( Bunny )
var mesh     = Mesh( material, geometry )

scene.add( mesh )

material.shading.color = [0.1,0.3,0.4]
mesh.transform.position[1] = -5
mesh.transform.position[2] = 0
camera.transform.position[2] = 20

scene.loop.on('update', function(e) {
	mesh.transform.euler[1] = e.elapsed * 0.001
	mesh.transform.euler[0] = e.elapsed * 0.0001
	scene.render( camera )
})
```

## Roadmap

| status | feature |
| ------ | ------- |
| done   | Basic working example with a flat material |
| done   | Basic documentation in place |
| todo   | Live examples |
| todo   | Testing |
| todo   | Normal shading material |
| todo   | Phong shading material |
| todo   | Directional lighting |
| todo   | And more |