[back to index](./)
# [Engine](https://github.com/gl-engine/gl-engine/tree/master/lib/engine)

| type          | example |
| ------------- | ----------------------------------------- |
| global object | `Engine.Engine`                             |
| CommonJS ES5  | `var Engine = require('gl-engine/es5/engine')` |
| CommonJS ES6  | `var Engine = require('gl-engine/lib/engine')` |
| ES6           | `import { Engine } from 'gl-engine'`           |

The engine automatically sets up the basic tools for working on a WebGL visualization with a renderer, loop and scene graph.

## Example

```js
import { Engine } from "gl-engine"

Engine(function( engine, scene ) {
	
	// Add things to your scene here
	
	engine.on('update', function(e) {
		//Update things in your scene here
	})
})
```

## API

### Engine( options )

The default exported function creates the `engine` object. 

| option         | type         | description |
| -------------- | ------------ | ----------- |
| renderer       | renderer     | A customized renderer. By default a [`ForwardRenderer`](./renderer-forward.md) is created automatically |
| autoStart      | Boolean      | Auto start the loop. Defaults to true. |
| emitter        | EventEmitter | Override the event emitter used by the engine. |
| customizeEvent | function     | This function passes in the event object from the loop and lets you add properties to it. |

### `engine` Object

| property       | type         | description |
| -------------- | ------------ | ----------- |
| loop           | [poem-loop][poem-loop] | A loop create by the [poem-loop][poem-loop] module. It starts automatically. |
| loop.start     | function     | Start the loop |
| loop.stop      | function     | Stops the loop but doesn't reset the elapsed time. |
| loop.reset     | function     | Resets the elapsed time. |
| emitter        | [EventEmitter][events] | The engine collects the events from other emitters including the [loop][poem-loop] and the renderer. |
| on             | function     | A shortcut for the `engine.emitter.on` |
| off            | function     | A shortcut for the `engine.emitter.removeListener` |
| scene          | Scene        | The current scene |
| renderer       | Renderer     | The current renderer |

### Events

Events are collected here for easy access. Use them like `engine.on('eventname', handler)`.

| event        | module                     | description |
| ------------ | -------------------------- | ----------- |
| update       | [poem-loop][poem-loop]     | An update loop |
| draw         | [poem-loop][poem-loop]     | A draw loop (if needed) |
| beforerender | [ForwardRenderer][forward] | Before the meshes are rendered, but after the renderer is initialized |
| afterrender  | [ForwardRenderer][forward] | After rendering |


[poem-loop]: https://npmjs.com/package/poem-loop/
[events]: https://npmjs.com/package/events/
[forward]: ./renderer-forward
[loop]: https://npmjs.com/package/poem-loop