#pragma glslify: fxaa = require(glsl-fxaa)

uniform vec2 uResolution;
uniform sampler2D uInput;

varying vec2 vUv;

void main() {
	vec2 fragCoord = vUv * uResolution;
	gl_FragColor = fxaa(uInput, fragCoord, resolution);
}
