[back to index](./)
# [PerspectiveCamera](https://github.com/gl-engine/gl-engine/tree/master/lib/camera/perspective)

| type          | example |
| ------------- | ---------------------------------------------------------------- |
| global object | `Engine.PerspectiveCamera`                                         |
| CommonJS ES5  | `var PerspectiveCamera = require('gl-engine/es5/camera/perspective')` |
| CommonJS ES6  | `var PerspectiveCamera = require('gl-engine/lib/camera/perspective')` |
| ES6           | `import { PerspectiveCamera } from 'gl-engine'`                       |

Create a perspective camera that includes a field of view, aspect ratio, and a near and far clipping. This type of camera simulates the projection of a normal point and click camera. Objects will converge towards the horizon line the further away they are from the camera.

## Example
```js
import { PerspectiveCamera } from 'gl-engine'

var camera = PerspectiveCamera({
	fov  : Math.PI*0.5,
	near : 0.01,
	far  : 100
})

camera.position[2] = -10

scene.render(camera)
```

## API

### `PerspectiveCamera(properties -> perspectiveCamera`

This function creates the `perspectiveCamera` object.

#### `PerspectiveCamera` Initial Properties

These properties can be passed into the constructing function, and accessed on the returned object.

| arg         | type    | default            | description |
| ----------- | ------- | ------------------ |
| fov         | number  | Math.PI / 4        | The field of view in radians, zoom in with a lower number, zoom out with a higher. |
| far         | number  | 100                | The far clipping range. Keep these numbers realistically close to what is in your scene or else you might get weird rendering artifacts due to float precision. |
| near        | number  | 1/100              | The near clipping range of the camera. |
| position    | array 3 | [0, 0, 0]          | The camera position. |
| direction   | array 3 | [0, 0, -1]         | The camera direction. |
| up          | array 3 | [0, 1, 0]          | The camera up vector. |
| viewport    | array 4 | [0,0,width,height] | The screen-space viewport bounds. Defaults to the canvas width and height |

#### `PerspectiveCamera` Functions

| function         | description |
| ---------------- | ----------- |
| identity         | Resets the `position`, `direction`, `up`, `projection` and `view` values to their identity; the defaults described in the constructor. |
| translate        | Translates this camera's `position` by the given `vec3`. |
| lookAt           | Updates the `direction` and `up` to look at the given `vec3` target. |
| project          | [Projects](https://github.com/Jam3/camera-project) the world space 3D point `vec3` into 2D screen-space based on this camera's `viewport` bounds. Returns a new `vec4` point with `z` and `w` components representing the computed depth (similar to `gl_FragCoord`). |
| unproject        | [Unprojects](https://github.com/Jam3/camera-unproject) the screen-space point into 3D world-space. The Z of the screen-space point is between 0 (near plane) and 1 (far plane). |
| createPickingRay | Creates a new picking ray from the 2D screen-space `vec2` point (i.e. the mouse). The ray is an instance of [ray-3d](https://github.com/Jam3/ray-3d), and it can be used for hit-testing. |
| use              | Use a camera control like [OrbitControls](./controls-orbit.md) to control how the camera behaves. See an individual camera control for a example usage. |
| update           | function | see below |
| updateModelView  | function | see below |
| updateNormal     | function | see below |
| updateMatrices   | function | see below |

#### `PerspectiveCamera` Additional Properties

These properties cannot be initially configured, but are provided as properties on the camera object.

| property   | type       | description |
| ---------- | ---------- | ----------- |
| projection | array 16   | The 4x4 projection matrix for a camera. |
| view       | array 16   | The 4x4 view matrix. |
| modelView  | array 16   | The combined model and view matrix. |
| normal     | array 9    | The normal matrix, a 3x3 matrix, used to transform normals for a mesh. |

#### `PerspectiveCamera` methods

##### `camera.identity() => camera`

Resets the `position`, `direction`, `up`, `projection` and `view` values to their identity; the defaults described in the constructor.

##### `camera.translate(vec3) => camera`

Translates this camera's `position` by the given `vec3`.

##### `camera.lookAt(vec3) => camera`

Updates the `direction` and `up` to look at the given `vec3` target.

##### `camera.project(vec3) => array 4`

[Projects](https://github.com/Jam3/camera-project) the world space 3D point `vec3` into 2D screen-space based on this camera's `viewport` bounds. Returns a new `vec4` point with `z` and `w` components representing the computed depth (similar to `gl_FragCoord`).

##### `camera.unproject(vec3) => array 3`

[Unprojects](https://github.com/Jam3/camera-unproject) the screen-space point into 3D world-space. The Z of the screen-space point is between 0 (near plane) and 1 (far plane).

##### `camera.createPickingRay(vec2)`

Creates a new picking ray from the 2D screen-space `vec2` point (i.e. the mouse).

The ray is an instance of [ray-3d](https://github.com/Jam3/ray-3d), and it can be used for hit-testing.

```js
var ray = camera.createPickingRay(mouse
if(ray.intersectsSphere(center, radius {
	console.log("Hit!")
}
```

#### `camera.use(controlsFunction, controlsProperties => camera`

Use a camera control like [OrbitControls](./controls-orbit.md) to control how the camera behaves.

```js
var camera = PerspectiveCamera()
	.use(OrbitControls, {
		distance : 10,
		target : [0,20,0]
	})
```

##### `camera.update()`

Updates the camera's projection and view matrices based on the controls and the camera's current state (position, direction, viewport, etc).

#### `camera.updateModelView(modelMatrix`

Updates the camera's model view matrix based on the provided model matrix.

#### `camera.updateNormal()`

Updates the normal matrix from the `camera.modelView` matrix.

#### `camera.updateMatrices()`

Update the camera projection and view matrices, but not the controls.
