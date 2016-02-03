#pragma glslify: Camera = require(./struct) 

#ifdef CAMERA
	void applyCamera(
		inout vec4 result,
		vec3 position,
		mat4 model,
		Camera camera,
		inout vec3 cameraPosition,
		inout float cameraDistance,
		inout vec3 cameraDirection
	) {
		vec4 globalPosition = model * vec4( position, 1.0 );
		cameraPosition = camera.position;
		cameraDistance = distance(camera.position, globalPosition.xyz);
		cameraDirection = normalize(camera.position - globalPosition.xyz);
		result = camera.projection * camera.view * globalPosition;
	}
#else
	void applyCamera(
		inout vec4 result,
		vec3 position,
		mat4 model,
		Camera camera,
		inout vec3 cameraPosition,
		inout vec3 cameraDistance,
		inout float cameraDirection
	) { }
#endif

#pragma glslify: export(applyCamera)