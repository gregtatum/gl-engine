#define GLSLIFY 1
uniform vec3 color;
uniform float opacity;

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

#ifdef CAMERA
	uniform CameraFrag camera
	varying CameraVert vCamera
#endif
