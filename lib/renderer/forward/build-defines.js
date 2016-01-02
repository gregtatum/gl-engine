/*
 * Adds unique defines to the top of a shader. When defines differ between shaders
 * a unique shader program is compiled and cached. Materials that share the same
 * shader code will result in the same cached shader. The defines are located
 * on the material property material.defines, and then the number of lights is
 * added at the end.
 */

function wordToExpression(define) {
	return "#define " + define + "\n"
}

export default function buildDefines( material, scene ) {

	var flags = material.defines.map(wordToExpression).join("")
	
	if( material.flags.useLights ) {
		flags += "#define DIRECTIONAL_LIGHT_COUNT " + scene.getByType('light/directional').length + "\n"
	}

	return flags
}
