
	#ifdef CAMERA
		vec4 globalPosition = model * vec4( position, 1.0 );
		vCameraPosition = camera.position;
		vCameraDistance = distance(camera.position, globalPosition.xyz);
		vCameraDirection = normalize(camera.position - globalPosition.xyz);
		gl_Position = camera.projection * camera.view * globalPosition;
	#endif