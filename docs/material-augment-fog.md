[back to index](./)
# [FogAugment](https://github.com/glamjs/glam/tree/master/lib/material/augment/fog)

| type          | example |
| ------------- | ----------------------------------------------------------- |
| global object | `Glam.FogAugment`                                           |
| CommonJS ES5  | `var FogAugment = require('glam/es5/material/augment/fog')` |
| CommonJS ES6  | `var FogAugment = require('glam/lib/material/augment/fog')` |
| ES6           | `import { FogAugment } from 'glam'`                         |

Augment a material with fog. The further away the mesh is, the more it turns the color of the fog.

## Example

```js
import FlatMaterial from "glam/lib/material/flat"
import FogAugment   from "glam/lib/material/augment/fog"

var material = FlatMaterial({
		color: [1,0,0]
	})
	.use(FogAugment, {
		color : [1,1,1],
		near : 10,
		far: 100
	})
	// Additional augments can be added here

// Then to update the fog properties

material.shading.fog.near = 30
material.shading.fog.color[0] *= 0.8
```

### Live Examples

* [Flat Bunny with Fog Augment][example-fog]

[example-fog]: http://requirebin.com/?gist=TatumCreative/c96e48648794a7565fcc

## Supported Materials

* [FlatMaterial](./material-flat.md)
* [LitMaterial](./material-lit.md)

## API

### `fogProperties`/`material.shading.fog` Object

| property | type       | description |
| -------- | ---------- | ----------- |
| near     | number     | How near from the camera the fog should start affecting the object |
| far      | number     | How far from the camera the fog should start affecting the object |
| color    | RGB array  | The color of the fog. |


### FogAugment( MaterialFactory|material, fogProperties  ) => material

The FogAugment is easiest to use with the `material.use( FogAugment, fogProperties )` interface.
However it is perfectly valid to use as a function. It returns a factory function that creates
the original type of material with your augments.

| arg             | type     | description |
| --------------- | -------- | ----------- |
| MaterialFactory | function | A function that creates a material |
| fogProperties   | object   | What the fog should look like, {near, far, color} }

or

| arg             | type     | description |
| --------------- | -------- | ----------- |
| material        | object   | An existing configured material to use. |
| fogProperties   | object   | What the fog should look like, {near, far, color} }


```
var fogProperties = { color : [1,0,0], near: 10, far: 100 }
var flatRedFog = FogAugment( FlatMaterial, fogProperties )
var material = flatRedFog()
```

```
var flatProperties = { color : [0,0,1] }
var fogProperties = { color : [1,0,0], near: 10, far: 100 }
var flatBlue = FlatMaterial(flatProperties)
var flatBlueWithRedFog = FogAugment( flatBlue, fogProperties )
var material = flatBlueWithRedFog()
```