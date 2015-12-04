precision mediump float;
uniform vec3 color;
uniform float opacity;

#pragma glslify: import('./camera/camera-struct.glsl')
#pragma glslify: import('./camera/camera-frag-vars.glsl')
#pragma glslify: import('../augments/fog/fog-frag-vars.glsl')