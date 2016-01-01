[back to index](./)
# [Scene](https://github.com/glamjs/glam/tree/master/lib/scene)

| type          | example |
| ------------- | --------------------------------------- |
| global object | `Glam.Scene`                            |
| CommonJS ES5  | `var Scene = require('glam/es5/scene')` |
| CommonJS ES6  | `var Scene = require('glam/lib/scene')` |
| ES6           | `import { Scene } from 'glam'`          |

The scene graph describes your WebGL visualization and is a tree structure made up of nodes. Nodes can be any object, but are typically meshes, cameras, and lights. Nodes can be added to other nodes in the scene, but it is unique to that scene. The transforms of the parent nodes apply down to the child nodes.

Typically the [Engine](./engine.md) will create the scene for you automatically.

## Example

```js
import { Scene, PerspectiveCamera, ForwardRenderer } from 'glam'
import meshes from "./custom-meshes"

var scene  = Scene({ renderer: ForwardRenderer() })
var camera = Camera()

meshes.forEach( mesh => scene.add( mesh ) )

scene.render( camera )
```

## API

### Scene( options )

The default exported function creates the `scene` object. 

| option         | type         | description |
| -------------- | ------------ | ----------- |
| renderer       | renderer     | A customized glam renderer. By default a [`renderer/forward`](renderer-forward.md) is created automatically |

### `scene` Object

| property       | type         | description |
| -------------- | ------------ | ----------- |
| children       | array        | An array of objects. The object must have a transform property. Typically meshes and cameras. |
| renderer       | object       | The currently attached renderer |
| add            | function     | Add an object to the scene |
| remove         | function     | Remove an object from the scene |
| flatten        | function     | Flatten the list of objects in the scene into a list |
| render         | function     | Render the scene with the currently attached renderer. |
| attachRenderer | function     | Attach a renderer to the scene. |
| getLights      | function     | Get a list of all of the lights |
| getObjectsByType | function   | Gets a list of objects by type |

#### `scene.add( node )`

Add a node object to the scene graph. The node must have a transform property.

#### `scene.add( parentNode, childNode )`

Add an object to another object. The transform of the parent node will affect the child node.

#### `scene.remove( node )`

Remove a node from the scene.

#### `scene.flatten()`

Returns a flattened representation of the scene. This will be augmented and changed in the future.

#### `scene.attachRenderer( renderer )`

Binds a renderer to the scene.

#### `scene.render( camera )`

Render the scene with the currently attached renderer, and a camera.

#### `scene.attachRenderer( renderer )`

You can manually run a renderer by calling `renderer.render( scene, camera )`. This function binds a renderer to the scene allowing for the `scene.render()` method.

#### `scene.getLights()`

Returns all of the lights in the scene.

#### `scene.getObjectsByType( type )`

Returns a list of all objects by type as matched by `object.type`. Type is a string.
