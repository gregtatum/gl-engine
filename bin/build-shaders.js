var Execute = require('child_process').execSync;

var libFiles = [
	[
		"material/common-src/common-frag-color.glsl",
		"material/common/frag-color.glsl",
	],
	[
		"material/common-src/common-frag-vars.glsl",
		"material/common/frag-vars.glsl",
	],
	[
		"material/common-src/common-vert-main.glsl",
		"material/common/vert-main.glsl",
	],
	[
		"material/common-src/common-vert-vars.glsl",
		"material/common/vert-vars.glsl",
	]
]

libFiles.forEach(function processLibFiles( tuple ) {

	var lib = __dirname + "/../lib/"
	var input = tuple[0]
	var output = tuple[1]
	
	var command = "glslify '"+ lib + input +"' -t glslify-import -o '"+ lib + output + "'"
	
	console.log("-------------------------------------------")
	console.log("input:", input)
	console.log("output:", output)
	console.log("warnings:")
	console.log(" ")
	
	Execute( command )
})