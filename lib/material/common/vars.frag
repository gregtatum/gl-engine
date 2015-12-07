uniform vec3 color;
uniform float opacity;

#ifdef V_NORMALS
	varying vec3 vNormal;
#endif

#pragma glslify: import('./camera/camera-struct.glsl')
#pragma glslify: import('./camera/camera-vars.frag')
#pragma glslify: import('../augment/fog/fog-vars.frag')
#pragma glslify: import('../augment/normal-color/normal-vars.frag')
