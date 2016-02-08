[back to index](./)
# [Mesh](https://github.com/gl-engine/gl-engine/tree/master/lib/mesh)

| type          | example |
| ------------- | ------------------------------------- |
| global object | `Engine.Mesh`                           |
| CommonJS ES5  | `var Mesh = require('gl-engine/es5/mesh')` |
| CommonJS ES6  | `var Mesh = require('gl-engine/lib/mesh')` |
| ES6           | `import { Mesh } from 'gl-engine'`         |

The basic object in a scene. It consists of a [geometry](./geometry.md), material, and a transform. The geometry holds all of the buffers of data, while the material contains the shader and description of how to draw the object. The transform contains the positioning information.

## Example

```js
import { Mesh, PerspectiveCamera, FlatMaterial, Scene, Geometry } from gl-engine
import Bunny from 'bunny'

Engine( (engine, scene) => {

	var camera = PerspectiveCamera()
	var mesh   = Mesh( Geometry( Bunny ), FlatMaterial() )

	scene.add( mesh )
	mesh.material.shading.color = [0.1,0.3,0.4]
	mesh.position[1] = -20
	engine.on( 'update', () => scene.render( camera ) )
})
```

## API

### Mesh( geometry, material )

The default exported function creates the `mesh` object. 

| arg      | type     | description |
| -------- | -------- | ----------- |
| geometry | geometry | A gl-engine geometry |
| material | material | A gl-engine material |

### `mesh` Object

| property     | type        | description |
| ------------ | ----------- | ----------- |
| meta         | TODO        | TODO        |
| transform    | [transform](./transform)   | The transform information for positioning the mesh in the scene. |
| material     | material    | A gl-engine material |
| geometry     | geometry    | A gl-engine geometry |
