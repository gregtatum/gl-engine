
	#ifdef CAMERA
		vec4 globalPosition = uModel * vec4( aPosition, 1.0 );
		vCameraPosition = uCamera.position;
		vCameraDistance = distance(uCamera.position, globalPosition.xyz);
		vCameraDirection = normalize(uCamera.position - globalPosition.xyz);
		gl_Position = uCamera.projection * uCamera.view * globalPosition;
	#endif