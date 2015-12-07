var Execute = require('child_process').execSync;

var libFiles = [
	[
		"material/flat/flat.frag",
		"material/flat/flat.built.frag",
	],
	[
		"material/flat/flat.vert",
		"material/flat/flat.built.vert",
	],
	[
		"material/lit/lit.frag",
		"material/lit/lit.built.frag",
	],
	[
		"material/lit/lit.vert",
		"material/lit/lit.built.vert",
	]
]

libFiles.forEach(function processLibFiles( tuple ) {

	var lib = __dirname + "/../lib/"
	var input = tuple[0]
	var output = tuple[1]
	
	console.log("-------------------------------------------")
	console.log("input:", input)
	console.log("output:", output)
	console.log("warnings:")
	console.log(" ")
	
	Execute( "glslify '"+ lib + input +"' -t glslify-import -o '"+ lib + output + "'" )
})