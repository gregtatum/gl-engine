[back to index](./)
# [LambertAugment](https://github.com/glamjs/glam/tree/master/lib/material/augment/lambert)

| type          | example |
| ------------- | ------------------------------------------------------------------ |
| global object | `Glam.LamberAugment`                                               |
| CommonJS ES5  | `var LamberAugment = require('glam/es5/material/augment/lambert')` |
| CommonJS ES6  | `var LamberAugment = require('glam/lib/material/augment/lambert')` |
| ES6           | `import { LamberAugment } from 'glam'`                             |

Create a lit, non-shiny material with the lambert reflectance model. This is calculated per-fragment.

## Example

```js
import LitMaterial from "glam/lib/material/lit"
import LambertAugment from "glam/lib/material/augment/lambert"

var material = LitMaterial({ color : [0.5,0.5,0.5]})
	.use(LambertAugment)
	// Additional augments can be added here

// Make sure to add lights to the scene your mesh witll be black
```

### Live Examples

* [Lambert Bunny with Directional Lights][example-lambert]

[example-lambert]: TODO

## Supported Materials

* [LitMaterial](./material-lit.md)

## API

### LambertAugment( MaterialFactory|material  ) => material

The LambertAugment is easiest to use with the `material.use( LambertAugment, lambertProperties )` interface.
However it is perfectly valid to use as a function. The function returns a factory function that creates
the original type of material with your augments.

| arg             | type     | description |
| --------------- | -------- | ----------- |
| MaterialFactory | function | A function that creates a material |

or

| arg             | type     | description |
| --------------- | -------- | ----------- |
| material        | object   | An existing configured material to use. |


```
var lambert = LambertAugment( LitMaterial )
var material = lambert()
```

```
var litBlue = LitMaterial({ color : [0,0,1] })
var litBlueLambert = LambertAugment( litBlue )
var material = litBlueLambert()
```