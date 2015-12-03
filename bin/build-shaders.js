var Exec = require('child_process').exec;

var files = [
	[
		__dirname + "/../lib/material/common-frag-color.glslify",
		__dirname + "/../lib/material/common-frag-color.glsl",
	],
	[
		__dirname + "/../lib/material/common-frag-vars.glslify",
		__dirname + "/../lib/material/common-frag-vars.glsl",
	],
	[
		__dirname + "/../lib/material/common-vert-main.glslify",
		__dirname + "/../lib/material/common-vert-main.glsl",
	],
	[
		__dirname + "/../lib/material/common-frag-vars.glslify",
		__dirname + "/../lib/material/common-frag-vars.glsl",
	]
]

files.map(function( tuple ) {

	return new Promise( function( resolve, reject ) {
		
		var input = tuple[0]
		var output = tuple[1]
		var command = "glslify "+ input +" -t glslify-import -o "+ output
		
		exec( command, function(error, stdout, stderr) {
			console.log(command)
			console.log(" ")
			console.log(stdout)
			error ? reject( error ) : resolve()
		})
	})
})