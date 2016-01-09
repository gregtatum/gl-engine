uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vNormal;

#pragma glslify: import('../common/camera/struct.glsl')
#pragma glslify: import('../common/camera/vars.frag')
#pragma glslify: import('../../augment/fog/vars.frag')
#pragma glslify: import('../../augment/normal-color/vars.frag')
#pragma glslify: import('../../light/directional/vars.frag')
#pragma glslify: import('../../augment/lambert/vars.frag')
