#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME flat material

struct Fog_0_0 {
	float near;
	float far;
	vec3 color;
};

#ifdef FOG
	float calculateFog_1_1(
		const float cameraDistance,
		const float near,
		const float far
	) {
		return 1.0 - clamp((far - cameraDistance) / (far - near), 0.0, 1.0);
	}

	void applyFog_1_2(
		inout vec4 fragment,
		Fog_0_0 fog,
		float cameraDistance
	) {
		fragment.rgb = mix(
			fragment.rgb,
			fog.color,
			calculateFog_1_1( cameraDistance, fog.near, fog.far)
		);
	}
#else
	void applyFog_1_2(inout vec4 fragment, Fog_0_0 fog, float cameraDistance ) { }
#endif

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

uniform Fog_0_0 uFog;

void main() {
	
	gl_FragColor = vec4(uColor, uOpacity);
	applyFog_1_2( gl_FragColor, uFog, vCameraDistance );
}
