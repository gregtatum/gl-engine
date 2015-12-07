uniform mat4 model;
attribute vec3 position;

#ifdef NORMAL
	attribute vec3 normal;
	varying vec3 vNormal;
#endif


#pragma glslify: import('../common/camera/camera-struct.glsl')
#pragma glslify: import('../common/camera/camera-vars.vert')