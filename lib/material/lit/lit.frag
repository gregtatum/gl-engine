precision mediump float;
#define SHADER_NAME lit material

#pragma glslify: fogAugment = require('../../augment/fog')
#pragma glslify: normalColorAugment = require('../../augment/normal-color')
#pragma glslify: lambertAugment = require('../../augment/lambert', lightCount = DIRECTIONAL_LIGHT_COUNT)
#pragma glslify: import('./vars.frag')

void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  
  fogAugment(gl_FragColor, uFog, vCameraDistance);
  normalColorAugment(gl_FragColor, vNormal, uNormalColorAmount);
  lambertAugment(gl_FragColor, uDirectionalLights, uLambertDiffuse, vNormal);
}
