function wordToExpression(define) {
	return "#define " + define + "\n"
}

export default function buildDefines( defines ) {
	return defines.map(wordToExpression).join("")
}