[back to index](./)
# Glam.FogAugment
## [material/augment/fog](https://github.com/glamjs/glam/tree/master/lib/material/augment/fog)

Augment a material with fog. The further away the mesh is, the more it turns the color of the fog.

## Example

```js
import FlatMaterial from "glam/lib/material/flat"
import Fog          from "glam/lib/material/augment/flog"

var flatProps = { color : [1,0,0] }
var fogProps = { color : [1,1,1], near : 10, far: 100 }
```

Then either this:

```js
var createFogMaterial = Fog( FlatMaterial )
var material = createFogMaterial( flatProps, fogProps )
```

Or that:

```js
var redMaterial = new FlatMaterial( flatProps )
var createFogOnRedMaterial = Fog( redMaterial )
var material = createFogOnRedMaterial( fogProps )
```

Then update the fog shading:

```js
material.shading.near = 30
material.shading.color[0] *= 0.8
```

## API

### Fog( MaterialFactory|material, fogProperties  )

The default exported function creates the `flatMaterial` object. 

| arg             | type     | description |
| --------------- | -------- | ----------- |
| MaterialFactory | function | A function that creates a material |
| fogProperties   | object   | What the fog should look like, {near, far, color} }

or

| arg             | type     | description |
| --------------- | -------- | ----------- |
| material        | object   | An existing configured material to use. |
| fogProperties   | object   | What the fog should look like, {near, far, color} }


### `material.shading.fog` and `fogProperties` Object

| property | type       | description |
| -------- | ---------- | ----------- |
| near     | number     | How near from the camera the fog should start affecting the object |
| far      | number     | How far from the camera the fog should start affecting the object |
| color    | RGB array  | The color of the fog. |

