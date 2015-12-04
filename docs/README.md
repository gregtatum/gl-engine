# Glam API Documentation

Glam is written with ES6 style modules in mind. Because of this the individual components can be accessed through `import Thing from 'glam/lib/thing'`. Typically Thing will be a single function that will create a new interface when called.

## API

| object                                             | path                                              |
| -------------------------------------------------- | ------------------------------------------------- |
| [Glam.PerspectiveCamera](./camera-perspective.md)  | [camera/perspective](./camera-perspective.md)     |
| [Glam.Geometry](./geometry.md)                     | [geometry](./geometry.md)                         |
| [Glam.FlatMaterial](./material-flat.md)            | [material/flat](./material-flat.md)               |
| [Glam.FogAugment](./material-augment-fog.md)       | [material/augment/fog](./material-augment-fog.md) |
| [Glam.Mesh](./mesh.md)                             | [mesh](./mesh.md)                                 |
| [Glam.ForwardRenderer](./renderer-forward.md)      | [renderer/forward](./renderer-forward.md)         |
| [Glame.Scene](./scene.md)                          | [scene](./scene.md)                               |
| [Glam.Transform](./transform.md)                   | [transform](./transform.md)                       |