/*

	This provides a little magic glue to make working with examples easy. There is a browserify
	transform that requires changes the glam require to use the local copy, making it easy
	to play around with and test new features.

	It also makes it really easy to launch individual examples through a simple command line
	interface.

*/

var Execute = require('child_process').exec
var Prompt = require('prompt');

var examples = require('../../examples/list.json')

;(function routeArgs() {
	var number = process.argv[2]
	
	if( number ) {
		var filename = examples[Number(number) - 1]
		buildExample( filename )
	} else {
		selectOptions()
	}
})();

function selectOptions() {
	
	var exampleList = examples.map(function( example, i ) {
		return "     " + (i + 1) + ") " + example
	})
	
	var schema = {
		properties : {
			exampleNumber : {
				message : "Select an example to build.\n\n" + exampleList.join("\n") + "\n\n"
			},
		}
	}
	
	Prompt.start();
	Prompt.get(schema, function (err, result) {
		
		var filename = examples[Number(result.exampleNumber) - 1]
		buildExample( filename )
	});
}

function buildExample( filename ) {
	
	console.log('buildExample', filename)
	
	if( filename ) {
		var findFolderName = /^[^\/]*/
		var folder = filename.match(findFolderName)[0]
		var packageJson = folder + "/package.json"
		
		var command = "requirebin './examples/"+ filename +"' './examples/"+ packageJson + "'"
		
		console.log( "Running: ", command )
		var requirebin = Execute( command )
		requirebin.stdout.pipe(process.stdout)
		
	}
}