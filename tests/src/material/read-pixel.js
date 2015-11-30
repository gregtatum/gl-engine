export default function readPixel( gl, x, y ) {
	
	var pixel = new Uint8Array(4)
	gl.readPixels( x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
	return [pixel[0], pixel[1], pixel[2]]
}