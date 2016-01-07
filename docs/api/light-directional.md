[back to index](./)
# [DirectionalLight](https://github.com/glamjs/glam/tree/master/lib/light/directional)

| type          | example |
| ------------- | ------------------------------------- |
| global object | `Glam.DirectionalLight`                           |
| CommonJS ES5  | `var DirectionalLight = require('glam/es5/light/directional')` |
| CommonJS ES6  | `var DirectionalLight = require('glam/lib/light/directional')` |
| ES6           | `import { DirectionalLight } from 'glam'`         |

A light that comes from a consistent direction, simulating something like a sun.

## Example

```js
import { DirectionalLight, PerspectiveCamera, Engine } from glam
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
