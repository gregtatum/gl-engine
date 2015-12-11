[back to index](./)
# Glam.LitMaterial
## [material/lit](https://github.com/glamjs/glam/tree/master/lib/material/lit)

A material that includes normal vectors in the shader. It is typically used for lit shading. By itself it will look like a flat material, but different lighting effects can be added with augments.

## Example

```js
import { Mesh, LitMaterial, Geometry } from 'glam'
import Bunny      from 'bunny'

var material = LitMaterial()
var geometry = Geometry( Bunny )
var mesh     = Mesh( material, geometry )

material.shading.color = [0.1,0.3,0.4]
```

### Live Examples

* [Lit Bunny with Normal Colors Augment](http://requirebin.com/?gist=TatumCreative/0c3c74675d0433d1daa1)

## Supported Augments

* [FogAugment](./material-augment-fog.md)
* [NormalColorsAugment](./material-augment-normal-colors.md)

## API

### LitMaterial( data )

The default exported function creates the `litMaterial` object. 

| arg  | type   | description |
| -----| ------ | ----------- |
| data | object | The data to use. |


### `litMaterial` Object

| property      | type      | description |
| ------------- | --------- | ----------- |
| fragSource    | text      | The fragment shader source |
| vertSource    | text      | The vertex shader source |
| shader        | [gl-shader](https://github.com/stackgl/gl-shader) | An instance of [gl-shader](https://github.com/stackgl/gl-shader). This is created by the first render. It can be created manually. Make sure and change the recompile flag to false. |
| mode          | string    | The shader rendering style. It defaults to `"TRIANGLES"`, but the possible values are `"POINTS"`, `"LINES"`, `"LINE_STRIP"`, `"LINE_LOOP"`, `"TRIANGLES"`, `"TRIANGLE_STRIP"`, and `"TRIANGLE_FAN"`. These correspond to the [gl drawing mode](https://msdn.microsoft.com/en-us/library/dn302395(v=vs.85).aspx). |
| flags         | object    | Boolean flags for rendering options. `{ visible, transparent, recompile }` |
| shading       | object    | An object containing the shading options. `{ color, opacity }` |
| setUniforms   | function  | see below |
| setAttributes | function  | see below |

#### `litMaterial.shading`

An object containing the shading options.

| property | type      | description |
| -------- | --------- | ----------- |
| color    | array 3   | An RGB representation of the color with values ranged 0-1. For example [1,0,0] would be red. |
| opacity  | number    | The opacity of the material ranged 0 to 1. The transparent flag needs to be set as well |

#### `litMaterial.flags`

An object containing the shading options.

| property    | type    | description |
| ----------- | ------- | ----------- |
| visible     | boolean | Whether or not to render the object. |
| transparent | boolean | Flags the material as using transparency. There are additional sorting costs to having transparency. |
| recompile   | boolean | Tell the renderer to recompile the shader from the fragSource and vertSource. |

#### `litMaterial.setUniforms( shader, camera, mesh )

Updates the uniforms for the material. This is called internally by the renderer.

| property | type      | description |
| -------- | --------- | ----------- |
| shader   | gl-shader | An instance of [gl-shader](https://github.com/stackgl/gl-shader) |
| camera   | camera    | A glam camera |
| mesh     | mesh      | A glam mesh   |

#### `litMaterial.setAttributes( geometry, buffers )

Uses [gl-geometry](https://github.com/hughsk/gl-geometry) to set the attributes before rendering.

| property | type        | description |
| -------- | ----------- | ----------- |
| geometry | geometry    | The glam geometry |
| buffers  | gl-geometry | An instance of [gl-geometry](https://github.com/hughsk/gl-geometry) |
