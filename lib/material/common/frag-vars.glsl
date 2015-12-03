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
	varying CameraVert vCamera
#endif
#ifdef FOG
	struct Fog {
		float near;
		float far;
		vec3 color;
	}

	uniform Fog fog;
#endif