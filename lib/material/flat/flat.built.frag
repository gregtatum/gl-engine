#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME flat.frag

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

	#pragma GL_ENGINE_REQUIRES FOG
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
#endif

uniform vec3 uColor;
uniform float uOpacity;

varying vec3 vCameraPosition;
varying vec3 vCameraDirection;
varying float vCameraDistance;

uniform Fog_0_0 uFog;

void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  applyFog_1_2(gl_FragColor, uFog, vCameraDistance);
}
