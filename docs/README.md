# Glam API Documentation

## API

| object                                              | path                                                       |
| --------------------------------------------------- | ---------------------------------------------------------- |
| [PerspectiveCamera](./api/camera-perspective.md)    | [glam/lib/camera/perspective](./api/camera-perspective.md)     |
| [Geometry](./api/geometry.md)                       | [glam/lib/geometry](./api/geometry.md)                         |
| [FlatMaterial](./api/material-flat.md)              | [glam/lib/material/flat](./api/material-flat.md)               |
| [LitMaterial](./api/material-lit.md)                | [glam/lib/material/lit](./api/material-lit.md)                 |
| [FogAugment](./api/material-augment-fog.md)         | [glam/lib/augment/fog](./api/material-augment-fog.md) |
| [NormalColorAugment](./api/material-augment-fog.md) | [glam/lib/augment/normal-color](./api/material-augment-normal-color.md) |
| [LambertAugment](./api/material-augment-fog.md)     | [glam/lib/augment/lambert](./api/material-augment-lambert.md) |
| [Mesh](./api/mesh.md)                               | [glam/lib/mesh](./api/mesh.md)                                 |
| [ForwardRenderer](./api/renderer-forward.md)        | [glam/lib/renderer/forward](./api/renderer-forward.md)         |
| [Scene](./api/scene.md)                             | [glam/lib/scene](./api/scene.md)                               |
| [Transform](./api/transform.md)                     | [glam/lib/transform](./api/transform.md)                       |

## A note on usage

Glam is written with ES6 style modules in mind. Because of this the individual components can be accessed a couple of ways.

#### ES6
	import Thing from 'glam'
	import Thing from 'glam/lib/thing'

#### ES5
	var Thing = require('glam/es5/thing')
	var Thing = require('glam').Thing
	//or
	var Glam = require('glam')
	Glam.Thing
