#ifdef FOG
	struct Fog {
		float near;
		float far;
		vec3 color;
	}

	uniform Fog fog;
#endif