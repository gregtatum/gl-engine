uniform mat4 uModel;
attribute vec3 aPosition;

#ifdef NORMAL
	attribute vec3 aNormal;
	varying vec3 vNormal;
#endif

#pragma glslify: import('../common/camera/vars.vert')