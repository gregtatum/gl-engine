[back to index](./)
# Glam.FlatMaterial
## [material/flat](https://github.com/glamjs/glam/tree/master/lib/material/flat)

The most basic of materials, a flat color.

## Example

```js
import Mesh       from "glam/lib/mesh"
import Material   from "glam/lib/material/flat"
import Geometry   from "glam/lib/geometry"
import Bunny      from 'bunny'


var material = Material()
var geometry = Geometry( Bunny )
var mesh     = Mesh( material, geometry )

material.shading.color = [0.1,0.3,0.4]
```

### Live Examples

* [Flat Blue Bunny](http://glamjs.github.io/glam/examples/02-fog/)
* [Flat Bunny with Fog Augment][example-fog] ([source][source-fog])

[example-hello-world]: http://requirebin.com/?gist=TatumCreative/40970c039f8c0ce44ae2
[example-fog]: http://requirebin.com/?gist=TatumCreative/c96e48648794a7565fcc

## Supported Augments

* [FogAugment](./material-augment-fog.md)

## API

### Material( data )

The default exported function creates the `flatMaterial` object. 

| arg  | type   | description |
| -----| ------ | ----------- |
| data | object | The data to use. |


### `flatMaterial` Object

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

#### `flatMaterial.shading`

An object containing the shading options.

| property | type      | description |
| -------- | --------- | ----------- |
| color    | array 3   | An RGB representation of the color with values ranged 0-1. For example [1,0,0] would be red. |
| opacity  | number    | The opacity of the material ranged 0 to 1. The transparent flag needs to be set as well |

#### `flatMaterial.flags`

An object containing the shading options.

| property    | type    | description |
| ----------- | ------- | ----------- |
| visible     | boolean | Whether or not to render the object. |
| transparent | boolean | Flags the material as using transparency. There are additional sorting costs to having transparency. |
| recompile   | boolean | Tell the renderer to recompile the shader from the fragSource and vertSource. |

#### `flatMaterial.setUniforms( shader, camera, mesh )

Updates the uniforms for the material. This is called internally by the renderer.

| property | type      | description |
| -------- | --------- | ----------- |
| shader   | gl-shader | An instance of [gl-shader](https://github.com/stackgl/gl-shader) |
| camera   | camera    | A glam camera |
| mesh     | mesh      | A glam mesh   |

#### `flatMaterial.setAttributes( geometry, buffers )

Uses [gl-geometry](https://github.com/hughsk/gl-geometry) to set the attributes before rendering.

| property | type        | description |
| -------- | ----------- | ----------- |
| geometry | geometry    | The glam geometry |
| buffers  | gl-geometry | An instance of [gl-geometry](https://github.com/hughsk/gl-geometry) |
