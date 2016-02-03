#pragma glslify: Camera = require(./struct) 

#ifdef CAMERA
	uniform Camera uCamera;
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif