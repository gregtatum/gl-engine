#ifdef FOG
	struct Fog {
		float near;
		float far;
		vec3 color;
	};

	uniform Fog fog;
	
	float calculateFog(
		const float dist,
		const float start,
		const float end
	) {
		return 1.0 - clamp((end - dist) / (end - start), 0.0, 1.0);
	}
#endif