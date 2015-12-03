#ifdef CAMERA
	vCamera.position = camera.position;
	vCamera.distance = distance(camera.position, position);
	vCamera.direction = normalize(camera.position - position);
	gl_Position = projection * view * model * vec4( position, 1.0 );
#endif