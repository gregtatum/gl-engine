precision mediump float;
#define SHADER_NAME flat material

#pragma glslify: fogAugment = require('../../augment/fog')
#pragma glslify: import('./vars.frag')

void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  fogAugment(gl_FragColor, uFog, vCameraDistance);
}
