# Getting started with glam your way

## Playing with examples

There are a bunch of different ways to get started playing with glam. The quickest is the [check out all of the examples](./examples.md) on RequireBin and get hacking right away. The examples can also be run locally from the command line, [see the examples page](./examples.md) for more info.

* Clone the repo: `git clone git@github.com:glamjs/glam.git`
* Go into the direction: `cd glam`
* Install the dependencies: `npm install`
* Run an example: `npm run example` then hit a number
* Point your browser to http://localhost:9966 and begin playing around.

## Using the library

#### Including through a script tag

To include on a page with a simple script tag like so: `<script src='glam.js'></script>`
heck out the [build folder][https://github.com/glamjs/glam/blob/master/build] for the latest release on the master branch.

* Source (minified): https://raw.githubusercontent.com/glamjs/glam/master/build/glam.js
* Optional Source Map: https://raw.githubusercontent.com/glamjs/glam/master/build/glam.js.map

#### npm

Glam is really built for npm. In your project all you have to do is run. `npm install glam` Then in your source code require it.

Glam is written with ES6 style modules in mind. Because of this the individual components can be accessed a couple of ways. Really it's up to what you are comfortable with.

#### ES6

	import { Thing1, Thing2 } from 'glam'
	import Thing1 from 'glam/lib/thing1'
	import Thing2 from 'glam/lib/thing2'

#### Standard CommonJS (node.js) style

	var Thing = require('glam/es5/thing')
	var Thing = require('glam').Thing
	//or
	var Glam = require('glam')
	Glam.Thing

#### Possible future support/explanations

File an issue if you need help getting going with your tool stack. I really want this project to be inclusive of the tooling you want to use.

 * AMD modules
 * Bower
 * Webpack
 * Browserify
