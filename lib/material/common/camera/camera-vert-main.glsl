
	#ifdef CAMERA
		vCameraPosition = camera.position;
		vCameraDistance = distance(camera.position, position);
		vCameraDirection = normalize(camera.position - position);
		gl_Position = camera.projection * camera.view * model * vec4( position, 1.0 );
	#endif