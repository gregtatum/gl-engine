# Getting started with gl-engine your way

## Playing with examples

There are a bunch of different ways to get started playing with gl-engine. The quickest is the [check out all of the examples](./examples.md) on RequireBin and get hacking right away. The examples can also be run locally from the command line, [see the examples page](./examples.md) for more info.

## Using the library

#### npm

gl-engine is built on [npm](https://docs.npmjs.com/getting-started/what-is-npm). In your project all you have to do is run `npm install gl-engine` from the command line, then `require('gl-engine')` from the source code. After running your files through a front end script bundler like [Browserify](http://browserify.org/) or [WebPack](https://webpack.github.io/) and you'll be good to go.

#### Including through a script tag

To include on a page with a simple script tag like so: `<script src='gl-engine.js'></script>`
heck out the [build folder](https://github.com/gl-engine/gl-engine/blob/master/build) for the latest release on the master branch.

* Source (minified): https://raw.githubusercontent.com/gl-engine/gl-engine/master/build/gl-engine.js
* Optional Source Map: https://raw.githubusercontent.com/gl-engine/gl-engine/master/build/gl-engine.js.map

#### Using ES6-style modules

gl-engine is written with ES6 style modules in mind. Because of this the individual components can be accessed a couple of ways. Really it's up to what you are comfortable with.

	import { Thing1, Thing2 } from 'gl-engine'
	import Thing1 from 'gl-engine/lib/thing1'
	import Thing2 from 'gl-engine/lib/thing2'

#### Or standard CommonJS (node.js) style

	var Thing = require('gl-engine/es5/thing')
	var Thing = require('gl-engine').Thing
	//or
	var Engine = require('gl-engine')
	Engine.Thing