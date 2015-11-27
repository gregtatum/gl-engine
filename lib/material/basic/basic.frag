precision mediump float;

uniform vec3 color;
uniform float opacity;

void main() {
	// gl_FragColor = vec4( vec3(0.5), 1.0 );
	gl_FragColor = vec4( color, opacity );
}
