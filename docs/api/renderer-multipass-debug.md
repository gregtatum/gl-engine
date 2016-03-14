[back to index](./)
# [MultipassDebug](https://github.com/gl-engine/gl-engine/tree/master/lib/renderer/multipass)

| type          | example |
| ------------- | --------------------------------------------------------------------- |
| global object | `Engine.MultipassDebug`                                            |
| CommonJS ES5  | `var MultipassDebug = require('gl-engine/es5/renderer/multipass')` |
| CommonJS ES6  | `var MultipassDebug = require('gl-engine/lib/renderer/multipass')` |
| ES6           | `import { MultipassDebug } from 'gl-engine'`                       |

## [renderer/multipass/debug](https://github.com/gl-engine/gl-engine/tree/master/lib/renderer/multipass/debug)

Debug multipass renders with a series of sequential views that are displayed on the screen showing the results of each pass.

```js
import {
  MultipassRenderer,
  MultipassDebug
} from "gl-engine"

var multipass = MultipassRenderer(renderer, MultipassDebug)
```
