[back to index](./)
# [FXAAPass](https://github.com/gl-engine/gl-engine/tree/master/lib/pass/fxaa)

| type          | example |
| ------------- | --------------------------------------------------------------------- |
| global object | `Engine.FXAAPass`                                            |
| CommonJS ES5  | `var FXAAPass = require('gl-engine/es5/pass/fxaa')` |
| CommonJS ES6  | `var FXAAPass = require('gl-engine/lib/pass/fxaa')` |
| ES6           | `import { FXAAPass } from 'gl-engine'`                       |

## [pass/fxaa](https://github.com/gl-engine/gl-engine/tree/master/lib/pass/fxaa)

The FXAA pass is a quick antialiasing pass. There aren't any configuration options for it.

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
    .use(FXAAPass())

  engine.on('update', () => {
    // Now render the scene
    multipass.render(camera)
  })
})
```
