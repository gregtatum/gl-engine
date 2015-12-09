# Glam API Documentation

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

## API

| object                                             | path                                              |
| -------------------------------------------------- | ------------------------------------------------- |
| [Glam.PerspectiveCamera](./camera-perspective.md)  | [glam/lib/camera/perspective](./camera-perspective.md)     |
| [Glam.Geometry](./geometry.md)                     | [glam/lib/geometry](./geometry.md)                         |
| [Glam.FlatMaterial](./material-flat.md)            | [glam/lib/material/flat](./material-flat.md)               |
| [Glam.FogAugment](./material-augment-fog.md)       | [glam/lib/material/augment/fog](./material-augment-fog.md) |
| [Glam.Mesh](./mesh.md)                             | [glam/lib/mesh](./mesh.md)                                 |
| [Glam.ForwardRenderer](./renderer-forward.md)      | [glam/lib/renderer/forward](./renderer-forward.md)         |
| [Glame.Scene](./scene.md)                          | [glam/lib/scene](./scene.md)                               |
| [Glam.Transform](./transform.md)                   | [glam/lib/transform](./transform.md)                       |