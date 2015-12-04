var Execute = require('child_process').exec
var Prompt = require('prompt');
var Budo = require('budo')
var Babelify = require('babelify')


var examples = [
	"hello-world",
	"fog",
]

;(function routeArgs() {
	var number = process.argv[2]
	
	if( number ) {
		var filename = examples[Number(number) - 1]
		console.log('number provided')
		runExample( filename )
	} else {
		console.log('select options')
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
				message : "Select an example to run.\n\n" + exampleList.join("\n") + "\n\n"
			},
		}
	}
	
	Prompt.start();
	Prompt.get(schema, function (err, result) {
		
		var filename = examples[Number(result.exampleNumber) - 1]
		runExample( filename )
	});
}

function runExample( filename ) {
	
	console.log('runExample', filename)
	
	if( filename ) {
		var command = "budo ./examples/"+filename+"/"+filename+".js -- -t [ babelify --presets [ es2015 ] ] -t brfs -t glslify"
		
		console.log( "Running: ", command )
		var budo = Execute( command )
		budo.stdout.pipe(process.stdout)
	}
}