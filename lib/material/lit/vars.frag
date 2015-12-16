uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vNormal;

#pragma glslify: import('../common/camera/camera-struct.glsl')
#pragma glslify: import('../common/camera/camera-vars.frag')
#pragma glslify: import('../../augment/fog/fog-vars.frag')
#pragma glslify: import('../../augment/normal-color/normal-vars.frag')
#pragma glslify: import('../../lights/directional/vars.frag')
#pragma glslify: import('../../augment/lambert/vars.frag')