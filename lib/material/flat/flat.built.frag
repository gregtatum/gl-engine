#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME flat material

uniform vec3 color;
uniform float opacity;

#ifdef CAMERA
	struct CameraVert {
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
	
	float calculateFog(
		const float cameraDistance,
		const float near,
		const float far
	) {
		return 1.0 - clamp((far - cameraDistance) / (far - near), 0.0, 1.0);
	}
#endif

void main() {
	
	gl_FragColor.rgb = color;
	gl_FragColor.a = opacity;

	
	#ifdef FOG
		gl_FragColor.rgb = mix(
			gl_FragColor.rgb,
			uFog.color,
			calculateFog( vCameraDistance, uFog.near, uFog.far)
		);
	#endif

}
