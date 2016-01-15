precision mediump float;
#define SHADER_NAME flat material

#pragma glslify: import('./vars.frag')

#pragma glslify: fogAugment = require('../../augment/fog')

void main() {
	
	gl_FragColor.rgb = uColor;
	gl_FragColor.a = uOpacity;
	
	fogAugment( gl_FragColor, uFog, vCameraDistance );
}
