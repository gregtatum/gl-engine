[back to index](./)
# [Scene](https://github.com/gl-engine/gl-engine/tree/master/lib/scene)

| type          | example |
| ------------- | --------------------------------------- |
| global object | `Engine.Scene`                            |
| CommonJS ES5  | `var Scene = require('gl-engine/es5/scene')` |
| CommonJS ES6  | `var Scene = require('gl-engine/lib/scene')` |
| ES6           | `import { Scene } from 'gl-engine'`          |

The scene graph describes your WebGL visualization and is a tree structure made up of nodes. Nodes can be any object, but are typically meshes, cameras, and lights. Nodes can be added to other nodes in the scene, but these relationships are unique to that scene. The transforms of the parent nodes apply down to the child nodes.

Typically the [Engine](./engine.md) will create the scene for you automatically.

## Examples

### Scene created by the Engine

```js
import { Engine, PerspectiveCamera } from 'gl-engine'
import meshes from "./custom-meshes"

Engine( (engine, scene) => {

	var camera = PerspectiveCamera()
	meshes.forEach( mesh => scene.add( mesh ) )
	engine.on('update', () => scene.render( camera ) )
})
```

### Scene created manually

```js
import { Scene, PerspectiveCamera, ForwardRenderer } from 'gl-engine'
import meshes from "./custom-meshes"

var scene  = Scene({ renderer: ForwardRenderer() })
var camera = PerspectiveCamera()

meshes.forEach( mesh => scene.add( mesh ) )

scene.render( camera )
```

## API

### Scene( options )

The default exported function creates the `scene` object. 

| option         | type         | description |
| -------------- | ------------ | ----------- |
| renderer       | renderer     | Attach a renderer. Defaults to no renderer if the scene is created manually. The engine will automatically attach a [ForwardRenderer](./renderer-forward.md) |

### `scene` Object

| property       | type         | description |
| -------------- | ------------ | ----------- |
| add            | function     | Add a node to the scene |
| remove         | function     | Remove a node from the scene |
| children       | function     | Get an array of children from a node |
| parent         | function     | Get a node's parent. |
| getByType      | function     | Get an array of nodes by type, as sorted by the string value of `node.type` |
| renderer       | object       | The currently attached renderer |
| attachRenderer | function     | Attach a renderer to the scene. |
| render         | function     | Render the scene with the currently attached renderer. |

#### `scene.add( node ) => scene`

Add a node object to the scene graph. The node can be any object.

#### `scene.add( parentNode, childNode ) => scene`

Add an object to another object. The transform of the parent node will affect the child node. Only nodes that are ultimately attached to the scene will be rendered. 

#### `scene.remove( node ) => scene`

Remove a node from the scene.

#### `scene.remove( parentNode, childNode ) => scene`

Remove a node from another node.

#### `scene.parent( node )`

Returns the parent of a node. The root node is the scene object itself.

#### `scene.getByType( 'typeName' ) => array`

Returns a list of nodes based on the `node.type` property. Do not modify this list as it is used internally for rendering the scene. If no children are found, then internally a new array is created and returned. This array is retained by the scene.

#### `scene.render( camera )`

Render the scene with the currently attached renderer, and a camera.

#### `scene.attachRenderer( renderer ) => scene`

You can manually run a renderer by calling `renderer.render( scene, camera )`. This function binds a renderer to the scene allowing for the `scene.render()` method.


