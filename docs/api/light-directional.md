[back to index](./)
# [DirectionalLight](https://github.com/gl-engine/gl-engine/tree/master/lib/light/directional)

| type          | example |
| ------------- | ------------------------------------- |
| global object | `Engine.DirectionalLight`                           |
| CommonJS ES5  | `var DirectionalLight = require('gl-engine/es5/light/directional')` |
| CommonJS ES6  | `var DirectionalLight = require('gl-engine/lib/light/directional')` |
| ES6           | `import { DirectionalLight } from 'gl-engine'`         |

A light that comes from a consistent direction, simulating something like a sun.

## Example

```js
import { DirectionalLight, PerspectiveCamera, Engine } from gl-engine
import MyMesh from './my-mesh'

Engine( (engine, scene) => {
	
	var camera = PerspectiveCamera()
	
	var light = DirectionalLight({
		color: [0.8, 0.5, 0.3 ],
		direction: [ 0.5, -0.5, 0.5 ]
	})
	
	scene.add( light )
	scene.add( MyMesh )

	engine.on( 'update', () => scene.render( camera ) )
})
```

## API

### DirectionalLight( properties )

| property     | type        | description |
| ------------ | ----------- | ----------- |
| direction    | array 3     | The direction to the light |
| color        | array 3     | The color of the light |

### `light` Object

| property     | type        | description |
| ------------ | ----------- | ----------- |
| direction    | array 3     | The direction to the light |
| color        | array 3     | The color of the light |
| meta         | TODO        | TODO        |
| transform    | [transform](./transform)   | TODO  |
| flags        | object      | Configuration options |
| flags.autoNormalizeDirection | Boolean | Automatically normalize the direction |
