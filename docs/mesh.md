[back to index](./index.md)
# Mesh

The basic object in a scene. It consists of a [geometry](./geometry.md), material, and a transform. The geometry holds all of the buffers of data, while the material contains the shader and description of how to draw the object. The transform contains the positioning information.

## Example

```js
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
mesh.transform.position[1] = -20
scene.render( camera )
```

## API

### Mesh( material, geometry )

The default exported function creates the `mesh` object. 

| arg      | type     | description |
| -------- | -------- | ----------- |
| material | material | A glam material |
| geometry | geometry | A glam geometry |

### `mesh` Object

| property     | type        | description |
| ------------ | ----------- | ----------- |
| meta         | TODO        | TODO        |
| transform    | [transform](./transform)   | The transform information for positioning the mesh in the scene. |
| material     | material    | A glam material |
| geometry     | geometry    | A glam geometry |