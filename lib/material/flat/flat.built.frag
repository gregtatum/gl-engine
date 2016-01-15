#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME flat material

uniform vec3 uColor;
uniform float uOpacity;

#ifdef CAMERA
	struct Camera {
		vec3 position;
		mat4 view;
		mat4 projection;
		mat4 modelView;
		mat3 normal;
	};
#endif

#ifdef CAMERA
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif

#ifdef FOG
	struct Fog {
	float near;
	float far;
	vec3 color;
};

	
	uniform Fog uFog;
#endif

#ifdef FOG
	float calculateFog(
		const float cameraDistance,
		const float near,
		const float far
	) {
		return 1.0 - clamp((far - cameraDistance) / (far - near), 0.0, 1.0);
	}

	void applyFog(
		inout vec4 fragment,
		Fog fog,
		cameraDistance_0
	) {
		fragment.rgb = mix(
			fragment.rgb,
			fog.color,
			calculateFog( cameraDistance_0, fog.near, fog.far)
		);
	}
#else
	void applyFog(inout vec4 fragment, Fog fog, cameraDistance_0 ) { }
#endif

void main() {
	
	gl_FragColor.rgb = uColor;
	gl_FragColor.a = uOpacity;
	
	applyFog( gl_FragColor, uFog, vCameraDistance );
}
