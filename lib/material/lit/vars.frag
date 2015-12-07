uniform vec3 color;
uniform float opacity;
varying vec3 vNormal;

#pragma glslify: import('../common/camera/camera-struct.glsl')
#pragma glslify: import('../common/camera/camera-vars.frag')
#pragma glslify: import('../augment/fog/fog-vars.frag')
#pragma glslify: import('../augment/normal-color/normal-vars.frag')