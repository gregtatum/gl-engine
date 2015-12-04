#ifdef CAMERA
	attribute vec3 position;
	uniform CameraVert camera;
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif
