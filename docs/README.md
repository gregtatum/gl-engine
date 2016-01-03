# Glam API Documentation

## API

| object                                              | path                                                       |
| --------------------------------------------------- | ---------------------------------------------------------- |
| [PerspectiveCamera](./api/camera-perspective.md)    | [glam/lib/camera/perspective](./api/camera-perspective.md)     |
| [Engine](./api/engine.md)                           | [glam/lib/engine](./api/engine.md)                             |
| [Geometry](./api/geometry.md)                       | [glam/lib/geometry](./api/geometry.md)                         |
| [DirectionalLight](./api/light-directional.md)      | [glam/lib/light/directional](./api/light-directional.md)       |
| [FlatMaterial](./api/material-flat.md)              | [glam/lib/material/flat](./api/material-flat.md)               |
| [LitMaterial](./api/material-lit.md)                | [glam/lib/material/lit](./api/material-lit.md)                 |
| [FogAugment](./api/material-augment-fog.md)         | [glam/lib/augment/fog](./api/material-augment-fog.md) |
| [NormalColorAugment](./api/material-augment-fog.md) | [glam/lib/augment/normal-color](./api/material-augment-normal-color.md) |
| [LambertAugment](./api/material-augment-fog.md)     | [glam/lib/augment/lambert](./api/material-augment-lambert.md)  |
| [Mesh](./api/mesh.md)                               | [glam/lib/mesh](./api/mesh.md)                                 |
| [ForwardRenderer](./api/renderer-forward.md)        | [glam/lib/renderer/forward](./api/renderer-forward.md)         |
| [Scene](./api/scene.md)                             | [glam/lib/scene](./api/scene.md)                               |
| [Transform](./api/transform.md)                     | [glam/lib/transform](./api/transform.md)                       |

## Getting started your way

Glam can be included in a project in a multitude of ways.

#### `<script src='glam.js'></script>`

Check out the [build folder][https://github.com/glamjs/glam/blob/master/build] for the latest release on the master branch.

* Source (minified): https://raw.githubusercontent.com/glamjs/glam/master/build/glam.js
* Optional Source Map: https://raw.githubusercontent.com/glamjs/glam/master/build/glam.js.map

#### npm

Glam is really built for npm. In your project all you have to do is run.

	npm install glam

Then in your source code require it.

Glam is written with ES6 style modules in mind. Because of this the individual components can be accessed a couple of ways. Really it's up to what you are comfortable with.

#### ES6

	import Thing from 'glam'
	import Thing from 'glam/lib/thing'

#### Standard CommonJS (node.js) style

	var Thing = require('glam/es5/thing')
	var Thing = require('glam').Thing
	//or
	var Glam = require('glam')
	Glam.Thing

#### Possible future support/explanations
 * AMD modules
 * Bower
 * Webpack
 * Browserify
