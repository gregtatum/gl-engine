#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME flat material

uniform vec3 color;
uniform float opacity;

#ifdef V_NORMALS
	varying vec3 vNormal;
#endif

#ifdef CAMERA
	struct CameraVert {
		vec3 position;
		mat4 view;
		mat4 projection;
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

	uniform Fog fog;
	
	float calculateFog(
		const float dist,
		const float start,
		const float end
	) {
		return 1.0 - clamp((end - dist) / (end - start), 0.0, 1.0);
	}
#endif
uniform float normalColorAmount;

void main() {
	
	gl_FragColor.rgb = color;
	gl_FragColor.a = opacity;

	
	#ifdef FOG
		gl_FragColor.rgb = mix(
			gl_FragColor.rgb,
			fog.color,
			calculateFog( vCameraDistance, fog.near, fog.far)
		);
	#endif

	
	#ifdef NORMAL_COLOR
		gl_FragColor.rgb = mix(
			gl_FragColor.rgb,
			vNormal * 0.5 + 0.5,
			normalColorAmount
		);
	#endif
}
