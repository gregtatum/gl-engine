[back to index](./)
# [Scene](https://github.com/glamjs/glam/tree/master/lib/scene)

| type          | example |
| ------------- | --------------------------------------- |
| global object | `Glam.Scene`                            |
| CommonJS ES5  | `var Scene = require('glam/es5/scene')` |
| CommonJS ES6  | `var Scene = require('glam/lib/scene')` |
| ES6           | `import { Scene } from 'glam'`          |

The scene describes your WebGL visualization. The scene automatically sets up the basic tools for working on a WebGL visualization with a renderer, loop and scene graph.

## Example

```js
import meshes     from "./meshes"
import Camera     from "glam/lib/camera/perspective"
import Scene      from "glam/lib/scene"

var scene    = Scene()
var camera   = Camera()

meshes.forEach( mesh => scene.add( mesh ) )

scene.loop.on('update', function(e) {
	
	meshes.forEach(( mesh, i ) => {
		mesh.transform.position[0] = Math.cos( i * 0.01 )
		mesh.transform.position[2] = Math.sin( i * 0.01 )
	})
	
	scene.render( camera )
})
```

## API

### Scene( options )

The default exported function creates the `scene` object. 

| option         | type         | description |
| -------------- | ------------ | ----------- |
| renderer       | renderer     | A customized glam renderer. By default a [`renderer/forward`](./renderer-forward.md) is created automatically |
| autoStart      | Boolean      | Auto start the loop. Defaults to true. |
| emitter        | EventEmitter | Override the event emitter used by the loop. |
| customizeEvent | function     | This function passes in the event object from the loop and lets you add properties to it. |

### `scene` Object

| property       | type         | description |
| -------------- | ------------ | ----------- |
| loop           | [poem-loop][poem-loop] | A loop create by the [poem-loop][poem-loop] module. It starts automatically. |
| render         | function     | The function used to render the scene. Set by the function doNothing() {}
| children       | array        | An array of objects. The object must have a transform property. Typically meshes and cameras. |
| add            | function     | Add an object to the scene |
| remove         | function     | Remove an object from the scene |
| flatten        | function     | Flatten the list of objects in the scene into a list |
| attachRenderer | function     | Attach a renderer to the scene. |
| emitter        | [EventEmitter][events] | The scene collects the events from other emitters including the [loop][poem-loop] and the renderer. |
| on             | function     | A shortcut for the `scene.emitter.on` |
| off            | function     | A shortcut for the `scene.emitter.removeListener` |

#### `scene.add( object )`

Add an object to the scene. The object must have a transform property.

#### `scene.remove( object )`

Remove an object from the scene.

#### `scene.flatten()`

Returns a flattened representation of the scene. This will be augmented and changed in the future.

### Events

Events are collected here for easy access. Use them like `scene.on('eventname', handler)`.

| event | module | description |
| ----- | ------ | ----------- |
| update | [poem-loop][poem-loop] | An update loop |
| draw   | [poem-loop][poem-loop] | A draw loop (if needed) |
| beforerender | [ForwardRenderer][forward] | Before the meshes are rendered, but after the renderer is initialized |
| afterrender | [ForwardRenderer][forward] | After rendering |


[poem-loop]: https://npmjs.com/package/poem-loop/
[events]: https://npmjs.com/package/events/
[forward]: ./renderer-forward
[loop]: https://npmjs.com/package/poem-loop