#ifdef DIRECTIONAL_LIGHT
	uniform DirectionalLight directionalLights[ DIRECTIONAL_LIGHT_COUNT ];
	
	uniform CameraVert camera;
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif