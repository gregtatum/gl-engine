/*

	This provides a little magic glue to make working with examples easy. There is a browserify
	transform that requires changes the gl-engine require to use the local copy, making it easy
	to play around with and test new features.

	It also makes it really easy to launch individual examples through a simple command line
	interface.

*/

var Execute = require('child_process').exec
var Prompt = require('prompt')

var examples = require('../../examples/list.json')

;(function routeArgs () {
  var number = process.argv[2]

  if (number) {
    var filename = examples[Number(number) - 1]
    runExample(filename)
  } else {
    selectOptions()
  }
})()

function selectOptions () {
  var exampleList = examples.map(function (example, i) {
    return '     ' + (i + 1) + ') ' + example
  })

  var schema = {
    properties: {
      exampleNumber: {
        message: 'Select an example to run.\n\n' + exampleList.join('\n') + '\n\n'
      }
    }
  }

  Prompt.start()
  Prompt.get(schema, function (err, result) {
    if (err) {
      throw err
    }
    var filename = examples[Number(result.exampleNumber) - 1]
    runExample(filename)
  })
}

function runExample (filename) {
  console.log('runExample', filename)

  if (filename) {
    var transforms = [
      '[ babelify --presets [ es2015 ] ]',
      'brfs',
      'glslify',
      './bin/examples/to-local-transform.js'
    ]

    var command = 'budo ./examples/' + filename + ' --live -- -t ' + transforms.join(' -t ')

    console.log('Running: ', command)
    var budo = Execute(command)
    budo.stdout.pipe(process.stdout)
  }
}
