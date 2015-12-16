# Glam API Documentation

## API

| object                                          | path                                                       |
| ----------------------------------------------- | ---------------------------------------------------------- |
| [PerspectiveCamera](./camera-perspective.md)    | [glam/lib/camera/perspective](./camera-perspective.md)     |
| [Geometry](./geometry.md)                       | [glam/lib/geometry](./geometry.md)                         |
| [FlatMaterial](./material-flat.md)              | [glam/lib/material/flat](./material-flat.md)               |
| [LitMaterial](./material-lit.md)                | [glam/lib/material/lit](./material-lit.md)                 |
| [FogAugment](./material-augment-fog.md)         | [glam/lib/augment/fog](./material-augment-fog.md) |
| [NormalColorAugment](./material-augment-fog.md) | [glam/lib/augment/normal-color](./material-augment-normal-color.md) |
| [LambertAugment](./material-augment-fog.md)     | [glam/lib/augment/lambert](./material-augment-lambert.md) |
| [Mesh](./mesh.md)                               | [glam/lib/mesh](./mesh.md)                                 |
| [ForwardRenderer](./renderer-forward.md)        | [glam/lib/renderer/forward](./renderer-forward.md)         |
| [Scene](./scene.md)                             | [glam/lib/scene](./scene.md)                               |
| [Transform](./transform.md)                     | [glam/lib/transform](./transform.md)                       |

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
