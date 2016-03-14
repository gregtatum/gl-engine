[back to index](./)
# [BloomPass](https://github.com/gl-engine/gl-engine/tree/master/lib/pass/bloom)

| type          | example |
| ------------- | --------------------------------------------------------------------- |
| global object | `Engine.BloomPass`                              |
| CommonJS ES5  | `var BloomPass = require('gl-engine/es5/pass/bloom')` |
| CommonJS ES6  | `var BloomPass = require('gl-engine/lib/pass/bloom')` |
| ES6           | `import { BloomPass } from 'gl-engine'`                       |

## [pass/bloom](https://github.com/gl-engine/gl-engine/tree/master/lib/pass/bloom)

Bloom simulates the effect in a camera when an area is so bright, it bleeds over in the lens and brightens the surrounding darker areas of a picture.

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
    .use(BloomPass({
      intensity: 0.5,
      kernelSize: 0.05,
      power: 2
    }))

  engine.on('update', () => {
    // Now render the scene
    multipass.render(camera)
  })
})
```

## API

### BloomPass({ intensity, kernelSize, power, gui })

| parameter  | type   | description |
| ---------- | ------ | ----------- |
| intensity  | Number | The linear intensity of the bloom effect. It ranges nicely between 0 and 1, but can go beyond that range. |
| power      | Number | The exponential intensity of the bloom effect |
| kernelSize | Number |
| gui        | Number | An instance of `dat.GUI` that will automatically add a folder with all of the configurable parameters for this pass. |

#### dat.GUI example

```
var gui = new dat.GUI()
var bloom = BloomPass({
  gui: gui
})
```

### Properties

| property   | type             | description |
| ---------- | ---------------- | ---------   |
| intensity  | number           | See above   |
| power      | number           | See above   |
| kernelSize | number           | See above   |
| shader     | gl-shader object | The compiled shader |
| render     | function         | The function that renders the pass. |
| initGL     | function         | Called once by the `MultipassRenderer` to initial the pass |
| addGui     | function         | Adds a dat.GUI folder |
| gui        | dat.GUI object   | A reference dat.GUI folder |

#### `bloomPass.addGui(gui)`

Adds a dat.GUI folder. Takes in a dat.GUI instance. Typically this is not called directly, but the gui instance is passed in as an option.

#### `bloomPass.render(input, renderScreen)`

The function that renders the pass, called by the MultipassRenderer. The input is the `gl-fbo` framebuffer to be taken as input, while the renderScreen is the function that will render the pass either to the screen or to a framebuffer.

#### `bloomPass.initGL(multipassRenderer, glContext)`

Called by the multipass renderer to initialize the pass with the gl context.
