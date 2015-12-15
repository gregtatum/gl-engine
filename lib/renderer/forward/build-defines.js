function wordToExpression(define) {
	return "#define " + define + "\n"
}

export default function buildDefines( defines, objectCounts ) {
	var flags = defines.map(wordToExpression).join("")
	flags += "#define DIRECTIONAL_LIGHT_COUNT " + ( objectCounts.DirectionalLight || 0) + "\n"
	return flags
}