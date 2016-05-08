[back to index](./)
# [MultipassRenderer](https://github.com/gl-engine/gl-engine/tree/master/lib/renderer/multipass)

| type          | example |
| ------------- | --------------------------------------------------------------------- |
| global object | `Engine.MultipassRenderer`                                            |
| CommonJS ES5  | `var MultipassRenderer = require('gl-engine/es5/renderer/multipass')` |
| CommonJS ES6  | `var MultipassRenderer = require('gl-engine/lib/renderer/multipass')` |
| ES6           | `import { MultipassRenderer } from 'gl-engine'`                       |

## [renderer/multipass](https://github.com/gl-engine/gl-engine/tree/master/lib/renderer/multipass)

The multipass renderer applies screen space effects to a series of passes. Typically the first pass is the scene render, then after that various effects can be added like bloom, depth of field, anti-aliasing, etc. Under the hood the passes render to framebuffers instead of the on-screen canvas. This allows the various passes to refer to the previous pass. Finally the last pass renders the results to the screen.

## Note on stability

This render's syntax may change somewhat in the near future for more complex use-cases.

## Example

```js
import {
  MultipassRenderer,
  PerspectiveCamera
  Scene,
  Engine
} from "gl-engine"

// For convenience start up everything with the Engine
Engine(function(engine, scene) {
  var camera = PerspectiveCamera()

  // The multipass renderer still needs a forward renderer
  var multipass = MultipassRenderer(scene.renderer)
    // The use syntax will use different passes, starting with rendering the scene
    .use(ScenePass({ scene: scene, camera: camera }))
    // After that start adding any effects passes
    .use(Bloom())

  engine.on('update', () => {
    // Now render the scene
    multipass.render(camera)
  })
})
```

## API

### MultipassRenderer(forwardRenderer, optionalDebugger)

Creates a multipass renderer backed by a forward renderer.

| parameter        | description |
| ---------------- | ------------- |
| forwardRenderer  | A forward renderer that provides the gl context, often it is handy to grab the default one created on a scene by `scene.renderer` |
| optionalDebugger | A function that creates a debugger. Pass in the `MultipassDebugger` here. |

#### multipassRenderer object

| property     | type         | description |
| ------------ | ------------ | ----------- |
| renderer     | object       | The forward renderer |
| gl           | WebGLContext | The current context from the forward renderer |
| passes       | Array        | An ordered list of passes. Pass can be safely removed from here but should be added with the `.use()` method. |
| resolution   | Array 2d     | The width and height of the current canvas |
| fbos         | Array        | Instances of `gl-fbo` |
| debug        | Object       | The debug instance that was created with the optionalDebugger function |
| canReadDepth | Boolean      | Flag that shows if the depth can be read from the framebuffer. This can't be done in WebGL 1.0 by default, and requires an extension. The multipass renderer automatically takes this into account when working with passes. |
| use          | Function     | Add passes to the renderer like so |
| render       | Function     | Render all the passes |
| destroy      | Function     | Destroys the underlying framebuffers |

#### `multipassRenderer.use(pass, ...morePasses)` => `multipassRenderer`

Add one or more passes to the multipass renderer. This function returns the `multipassRenderer` so that commands can be chained.

```
var renderer = MultipassRenderer(scene.renderer)

var scenePass = ScenePass({ scene: scene, camera: camera })
renderer.use(scenePass)

//Or
renderer.use(BloomPass(), FXAAPass())

//Or
renderer
  .use(BloomPass())
  .use(FXAAPass())
```

#### `multipassRenderer.render()`

Render the all the passes

#### `multipassRenderer.destroy()`

Destroy the underlying framebuffer objects that are allocated by WebGL context. This must be done manually or else the renderer will leak memory.
