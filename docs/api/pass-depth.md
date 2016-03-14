[back to index](./)
# [DepthPass](https://github.com/gl-engine/gl-engine/tree/master/lib/pass/depth)

| type          | example |
| ------------- | --------------------------------------------------------------------- |
| global object | `Engine.DepthPass`                                            |
| CommonJS ES5  | `var DepthPass = require('gl-engine/es5/pass/depth')` |
| CommonJS ES6  | `var DepthPass = require('gl-engine/lib/pass/depth')` |
| ES6           | `import { DepthPass } from 'gl-engine'`                       |

## [pass/depth](https://github.com/gl-engine/gl-engine/tree/master/lib/pass/depth)

Render out the contents of the depth buffer. Not all devices can access the depth from a framebuffer, so this pass is a hack to obtain the underlying buffer into the color buffer. It's typically used internally within gl-engine's passes, but could be used artistically.

### Example

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
    .use(DepthPass())

  engine.on('update', () => {
    // Now render the scene
    multipass.render(camera)
  })
})
```
