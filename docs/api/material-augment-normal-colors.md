[back to index](./)
# [NormalColorsAugment](https://github.com/glamjs/glam/tree/master/lib/augment/normal-colors)

| type          | example |
| ------------- | ------------------------------------------------------------------------------ |
| global object | `Glam.NormalColorsAugment`                                                     |
| CommonJS ES5  | `var NormalColorsAugment = require('glam/es5/augment/normal-colors')` |
| CommonJS ES6  | `var NormalColorsAugment = require('glam/lib/augment/normal-colors')` |
| ES6           | `import { NormalColorsAugment } from 'glam'`                                   |

Augment a material with normal colors. The model's normals are used to directly light the model, which
can be useful for debugging.

## Examples

```js
import LitMaterial from "glam/lib/material/lit"
import NormalColorsAugment from "glam/lib/augment/normal-colors"

var material = LitMaterial()
	.use(NormalColorsAugment, {
		amount : 1.0
	})
	// Additional augments can be added here

// Then to update the normalColors properties:
material.shading.normalColors.amount = 0.8
```

### Live Examples

* [Lit Bunny with Normal Colors Augment][example-normal-colors]

[example-normal-colors]: http://requirebin.com/?gist=TatumCreative/0c3c74675d0433d1daa1

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
var normalMaterial = NormalColorsAugment( LitMaterial, normalColorsProperties )
var material = normalMaterial()
```

```
var litProperties = { color : [1,0,1] }
var normalColorsProperties = { amount : 0.5 }
var litMagenta = LitMaterial(litProperties)
var magentaWithNormalColors = NormalColorsAugment( litMagenta, normalColorsProperties )
var material = magentaWithNormalColors()
```