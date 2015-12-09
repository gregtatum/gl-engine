[back to index](./)
# Glam.NormalColorsAugment
## [material/augment/fog](https://github.com/glamjs/glam/tree/master/lib/material/augment/fog)

Augment a material with fog. The further away the mesh is, the more it turns the color of the fog.

## Example

```js
import FlatMaterial from "glam/lib/material/flat"
import NormalColorsAugment from "glam/lib/material/augment/normal-colors"

var material = FlatMaterial()
	.use(NormalColorsAugment, {
		amount : 1.0
	})
	// Additional augments can be added here

// Then to update the normalColors properties:
material.shading.normalColors.amount = 0.8
```

### Live Examples

* [Flat Bunny with Normal Colors Augment][example-normal-colors] ([source][source-normal-colors])

[example-normal-colors]: http://glamjs.github.io/glam/examples/03-normal-colors/
[source-normal-colors]: https://github.com/glamjs/glam/blob/master/examples/03-normal-colors/normal-colors.js

## Supported Materials

* [LitMaterial](./material-lit.md)

## API

### `normalColorsProperties`/`material.shading.normalColors` Object

| property | type       | description |
| -------- | ---------- | ----------- |
| amount   | number     | How much of the normal color to show over the base material color. Defaults to 1.0 which is 100%. |


### NormalColorsAugment( MaterialFactory|material, normalColorsProperties  ) => material

The NormalColorsAugment is easiest to use with the `material.use( NormalColorsAugment, normalColorsProperties )` interface.
However it is perfectly valid to use as a function. It returns a factory function that creates
the original type of material with your augments.

| arg             | type     | description |
| --------------- | -------- | ----------- |
| MaterialFactory | function | A function that creates a material |
| normalColorsProperties  | object   | What the normalColors should look like, { amount } }

or

| arg             | type     | description |
| --------------- | -------- | ----------- |
| material        | object   | An existing configured material to use. |
| normalColorsProperties | object | What the normalColors should look like, { amount } }


```
var normalColorsProperties = { amount : 1.0 }
var normalMaterial = NormalColorsAugment( FlatMaterial, normalColorsProperties )
var material = normalMaterial()
```

```
var flatProperties = { color : [1,0,1] }
var normalColorsProperties = { amount : 0.5 }
var flatMagenta = FlatMaterial(flatProperties)
var magentaWithNormalColors = NormalColorsAugment( flatMagenta, normalColorsProperties )
var material = magentaWithNormalColors()
```