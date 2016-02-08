[back to index](./)
# [OrbitControls](https://github.com/gl-engine/gl-engine/tree/master/lib/controls/orbit)

| type          | example |
| ------------- | -------------------------------------------------------- |
| global object | `Engine.OrbitControls`                                     |
| CommonJS ES5  | `var OrbitControls = require('gl-engine/es5/controls/orbit')` |
| CommonJS ES6  | `var OrbitControls = require('gl-engine/lib/controls/orbit')` |
| ES6           | `import { OrbitControls } from 'gl-engine'`                   |

Controls for orbiting a camera around a point.

## Example

```js
var camera = PerspectiveCamera()
	.use( OrbitControls, {
		distance : 10,
		target   : [0,20,0]
	})

camera.controls.distance = 12
```

#### `controls = OrbitControls( options )`

| property       | default     | description |
| -------------- | ----------- | ----------- |
| target         | `[0, 0, 0]` | the center of the orbit |
| phi            | `0`         | the initial rotation in radians, phi in spherical coordinates |
| theta          | `0`         | the initial rotation in radians, theta in spherical coordinates |
| distance       | `1`         | the distance from the target |
| damping        | `0.25`      | how fast the controls slow down, between `0` and `1` |
| rotateSpeed    | `0.28`      | the speed of the rotation |
| zoomSpeed      | `0.0075`    | the speed of the zoom |
| pinchSpeed     | `0.0075`    | (coming soon) the speed of the pinch |
| pinch          | `true`      | (coming soon) enable pinching |
| zoom           | `true`      | enable zooming |
| rotate         | `true`      | enable rotating |
| phiBounds      | `[0, PI]`   | the bounds of the phi rotation |
| thetaBounds    | `[-∞, ∞]`   | the bounds of the theta rotation |
| distanceBounds | `[1, ∞]`    | the bounds of the distance |
| parent         | `window`    | the parent element |
| element        | `window`    | the element |

## methods

#### `controls.update()`

Update the controls. This is typically handled automatically if the `camera.use()` approach is taken.

#### `controls.updateController(position, direction, up)`

Use the controls to update a camera's position vector, direction vector, and up vector. This is handled automatically when used with the `camera.use( OrbitControls )` syntax.

## properties

#### `target`

The vec3 center of the orbit

#### `phi`, `theta`

The initial rotation in radians, in spherical coordinates

#### `distance`

The distance from the target, default `1`

#### `damping`

How fast the controls slow down, between `0` and `1`, default `0.25`

#### `rotateSpeed`, `zoomSpeed`, `pinchSpeed`

The speed of the controls.

#### `pinch`, `zoom`, `rotate`

Enable pinch, zoom, and rotate

#### `phiBounds`, `thetaBounds`, `distanceBounds`

The bounds of the controls
