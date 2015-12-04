[back to index](./)
# Glam.ForwardRenderer
## [renderer/forward](https://github.com/glamjs/glam/tree/master/lib/renderer/forward)

The forward renderer is created by default for a scene. However the renderer can be created on its own to customize the functionality. This renderer creates a gl context from a canvas. When it is run it creates and updates any necessary WebGL buffers and shaders. It updates the transform matrices and then renders the scene. The renderer does a forward render with no frills.

## Example

```js
import Renderer from 'glam/lib/renderer/forward'
import Scene    from "glam/lib/scene"

var renderer = Renderer()

var scene    = Scene({
	renderer : renderer
})
```

## API

### Renderer( options )

The default exported function creates the `forwardRenderer` object. 

| option           | type          | description |
| ---------------- | ------------- | ----------- |
| autoAddCanvas    | boolean       | Automatically add the canvas to the DOM |
| autoResizeCanvas | boolean       | Automatically resize the canvas to the size of the parent element |
| canvas           | CanvasElement | Provide a canvas element |
| width            | number        | The width of the DOM element if it's not auto-sizing |
| height           | number        | The height of the DOM element if it's not auto-sizing |
| parentEl         | DOMElement    | The DOM element to attach the canvas to. Defaults to the `document.body` |
| clear            | object        | An object controlling the clear options |
| + more  | WebGLContextAttributes | In [WebGLContextAttributes](https://www.khronos.org/registry/webgl/specs/1.0/#5.2) attributes may be passed in. They will be used during the `getContext` call. These attributes are `alpha`, `depth`, `stencil`, `antialias`, `premultipliedAlpha`, `preserveDrawingBuffer`, `preferLowPowerToHighPerformance`, and `failIfMajorPerformanceCaveat`. |

#### clear option

| option  | type     | description |
| --------| -------- | ----------- |
| color   | array    | The RGBA color to clear. Set to null to not clear the color |
| depth   | boolean  | Flag to clear the depth |
| stencil | boolean  | Flag to clear the stencil |

### `forwardRenderer` Object

| property | type          | description |
| -------- | ------------- | ----------- |
| gl       | WebGLContext  | The current gl context. |
| canvas   | CanvasElement | The current canvas element. |
| render   | function      | This renders the scene with a camera. |
| renderer | object        | The currently attached renderer. |

#### `forwardRenderer.render( scene, camera )`

Pass in a scene and camera and it will render a frame.
