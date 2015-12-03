#ifdef CAMERA
	struct CameraFrag {
		vec3 position;
		vec3 direction;
		float dist;
	}

	struct CameraVert {
		vec3 position;
		mat4 view;
		mat4 projection;
	}
#endif
