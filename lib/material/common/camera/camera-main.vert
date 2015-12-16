
	#ifdef CAMERA
		vec4 globalPosition = model * vec4( position, 1.0 );
		vCameraPosition = uCamera.position;
		vCameraDistance = distance(uCamera.position, globalPosition.xyz);
		vCameraDirection = normalize(uCamera.position - globalPosition.xyz);
		gl_Position = uCamera.projection * uCamera.view * globalPosition;
	#endif