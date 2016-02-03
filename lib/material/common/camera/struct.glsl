#ifdef CAMERA
	struct Camera {
		vec3 position;
		mat4 view;
		mat4 projection;
		mat4 modelView;
		mat3 normal;
	};
#endif
#pragma glslify: export(Camera)