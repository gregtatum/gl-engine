# Getting started with glam your way

## Playing with examples

There are a bunch of different ways to get started playing with glam. The quickest is the [check out all of the examples](./examples.md) on RequireBin and get hacking right away. The examples can also be run locally from the command line, [see the examples page](./examples.md) for more info.

## Using the library

#### npm

Glam is built on [npm](https://docs.npmjs.com/getting-started/what-is-npm). In your project all you have to do is run `npm install glam` from the command line, then `require('glam')` from the source code. After running your files through a front end script bundler like [Browserify](http://browserify.org/) or [WebPack](https://webpack.github.io/) and you'll be good to go.

#### Including through a script tag

To include on a page with a simple script tag like so: `<script src='glam.js'></script>`
heck out the [build folder](https://github.com/glamjs/glam/blob/master/build) for the latest release on the master branch.

* Source (minified): https://raw.githubusercontent.com/glamjs/glam/master/build/glam.js
* Optional Source Map: https://raw.githubusercontent.com/glamjs/glam/master/build/glam.js.map

#### Using ES6-style modules

Glam is written with ES6 style modules in mind. Because of this the individual components can be accessed a couple of ways. Really it's up to what you are comfortable with.

	import { Thing1, Thing2 } from 'glam'
	import Thing1 from 'glam/lib/thing1'
	import Thing2 from 'glam/lib/thing2'

#### Or standard CommonJS (node.js) style

	var Thing = require('glam/es5/thing')
	var Thing = require('glam').Thing
	//or
	var Glam = require('glam')
	Glam.Thing