[back to index](./)
# [Geometry](https://github.com/gl-engine/gl-engine/tree/master/lib/geometry)

| type          | example |
| ------------- | --------------------------------------------- |
| global object | `Engine.Geometry`                               |
| CommonJS ES5  | `var Geometry = require('gl-engine/es5/geometry')` |
| CommonJS ES6  | `var Geometry = require('gl-engine/lib/geometry')` |
| ES6           | `import { Geometry } from 'gl-engine'`             |

Geometry contains all of the data buffers for rendering. The buffers are managed by [stack.gl](http://stack.gl)'s [gl-geometry](http://stack.gl/packages/#hughsk/gl-geometry). Buffers typically consist of vertex positions, elements arrays (known as cells, or faces), normals, and other per-vertex data.

## Example

```js
import Geometry   from "gl-engine/lib/geometry"
import CreateBox  from 'geo-3d-box'

var box = Box({size: 5})
// box contains a positions and cells properties
var geometry = Geometry( box )
```

## API

### Geometry( data )

The default exported function creates the `geometry` object. 

| arg  | type   | description |
| -----| ------ | ----------- |
| data | object | The data to use. |


### `geometry` Object

| property     | type        | description |
| ------------ | ----------- | ----------- |
| flags        | object      | Boolean flags for rendering options. { updateBuffers } |
| buffers      | gl-geometry | An instance of stack.gl's [stack.gl](http://stack.gl)'s [gl-geometry](http://stack.gl/packages/#hughsk/gl-geometry). This gets created by the renderer. It can be manually created before the initial render. |
| data         | object      | The pre-processed data like positions, cells, and normals. |