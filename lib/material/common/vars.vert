uniform mat4 model;
attribute vec3 position;

#ifdef NORMALS
	attribute vec3 normal;
#endif
#ifdef V_NORMALS
	varying vec3 vNormal;
#endif


#pragma glslify: import('./camera/camera-struct.glsl')
#pragma glslify: import('./camera/camera-vars.vert')