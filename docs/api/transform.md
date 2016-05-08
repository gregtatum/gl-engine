[back to index](./)
# [Transform](https://github.com/gl-engine/gl-engine/tree/master/lib/transform)

| type          | example |
| ------------- | --------------------------------------------- |
| global object | `Engine.Transform`                               |
| CommonJS ES5  | `var Transform = require('gl-engine/es5/transform')` |
| CommonJS ES6  | `var Transform = require('gl-engine/lib/transform')` |
| ES6           | `import { Transform } from 'gl-engine'`             |

Generates an object that contains a set of standard transformations to represent a thing in space. I

## Example

```js
import { Mesh } from 'gl-engine'
 
var mesh = Mesh()

// A transform object is created for the mesh
mesh.transform

// And mesh is decorated with
mesh.position
mesh.scale
mesh.quaternion
mesh.euler

// Change properties manually
mesh.transform.eulerOrder = ['z','y','x']
mesh.transform.position[z] = -100

// Or with functions
import Vec3 from 'gl-vec3'

Vec3.scale(mesh.scale, mesh.scale, 5

// In a loop it could look like
var origin = [0,0,0]
scene.on('update', function(e) {
	//Slowly move the mesh around the axis without changing its orientation
	Vec3.rotateY(
		mesh.position,      // target
		mesh.position,      // point to move
		origin,             // what to move around
		e.elapsed * 0.001   // How much to move it
	)
})
```

## API

### `Transform(optionalDecoratee => transformObject`

Creates a transform object. It can optional be passed an object to decorate with `position`, `scale`, `quaternion`, and `euler`. Generally speaking this function is not used directly.

### `transform` Object

| arg              | type     | default       | description |
| ---------------- | -------- | ------------- |
| flags            | object   |               | True or false flags |
| flags.autoUpdate | boolean  | true          | Automatically update the local and global matrices from the `position`, `scale`, `quaternion`, and `euler`. |
| flags.useEuler   | boolean  | true          | When true, use the euler angle for rotation. This auto-updates the quaternion. |
| position         | array 3  | [0,0,0]       | The x, y, z position of the thing in space. Check out [gl-vec3][gl-vec3] for some handy functions. |
| scale            | array 3  | [1,1,1]       | The scale of the thing in space with respect to the x, y, and z axis. Check out [gl-vec3][gl-vec3] for some handy functions. |
| quaternion       | array 4  | [0,0,0,1]     | A [quaternion][quaternion-article] that represents the rotation. Check out [gl-quat][gl-quat] for functions to work with quaternions. |
| euler            | array 3  | [0,0,0]       | An Euler rotation (pronounced oiler). Each number represents the amount of rotation on an axis (in radians). So increasing the value of euler[0] would be like grabbing the X axis and spinning a model with it. |
| eulerOrder       | array 3  | ['x','y','z'] | The order the Euler angles are applied. Check out this video on [gimbal lock][gimbal-lock] to see why this can come in handy. |
| local            | array 16 | identity mat4 | The matrix that gets computed to represent the transformation in local space (relative to the parent object). Check out [Matrix math for the web][matrix-math] for an intro into working with matrices. |
| global           | array 16 | identity mat4 | The matrix that gets computed to represent the transformation in global or world space. This matrix will move the thing to its final destination. Check out [Matrix math for the web][matrix-math] for an intro into working with matrices. |
| globalPosition   | array 3  | [0,0,0]       | The global position computed alongside the global matrix. |

[quaternion-article]: http://www.3dgep.com/understanding-quaternions/
[gl-quat]: https://github.com/stackgl/gl-quat
[gl-vec3]: https://github.com/stackgl/gl-vec3
[gl-mat4]: https://github.com/stackgl/gl-mat4
[gimbal-lock]: https://www.youtube.com/watch?v=zc8b2Jo7mno
[matrix-math]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web
