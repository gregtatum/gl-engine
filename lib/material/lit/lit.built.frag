#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME lit.frag

struct Fog_0_0 {
	float near;
	float far;
	vec3 color;
};

#ifdef FOG
	float calculateFog_3_2(
		const float cameraDistance,
		const float near,
		const float far
	) {
		return 1.0 - clamp((far - cameraDistance) / (far - near), 0.0, 1.0);
	}

	#pragma GL_ENGINE_REQUIRES FOG
	void applyFog_3_3(
		inout vec4 fragment,
		Fog_0_0 fog,
		float cameraDistance
	) {
		fragment.rgb = mix(
			fragment.rgb,
			fog.color,
			calculateFog_3_2( cameraDistance, fog.near, fog.far)
		);
	}
#endif

#ifdef NORMAL_COLOR
	#pragma GL_ENGINE_REQUIRES NORMAL_COLOR
	void applyNormalColor_2_4(
		inout vec4 fragment,
		in vec3 normal,
		in float amount
	) {
		fragment.rgb = mix(fragment.rgb, normal * 0.5 + 0.5, amount);
	}
#endif

struct DirectionalLight_1_1 {
  vec3 direction;
  vec3 color;
};

#if defined(LAMBERT) && defined(DIRECTIONAL_LIGHT_COUNT) && DIRECTIONAL_LIGHT_COUNT > 0
  #pragma GL_ENGINE_REQUIRES LAMBERT && DIRECTIONAL_LIGHT_COUNT
  void lambertianReflectance_4_5(
    inout vec4 fragment,
    DirectionalLight_1_1 directionalLights[DIRECTIONAL_LIGHT_COUNT],
    in vec3 diffuse,
    in vec3 normal_4_6
  ) {

    for(int i_4_7=0; i_4_7 < DIRECTIONAL_LIGHT_COUNT; i_4_7++) {
      DirectionalLight_1_1 light = directionalLights[i_4_7];
    
      float lightDotProduct = dot(normalize(normal_4_6), light.direction);
      float surfaceBrightness = max(0.0, lightDotProduct);
    
      fragment.xyz += diffuse * light.color * surfaceBrightness;
    }
  }
#endif

uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vNormal;

varying vec3 vCameraPosition;
varying vec3 vCameraDirection;
varying float vCameraDistance;

uniform Fog_0_0 uFog;

uniform float uNormalColorAmount;

#ifdef DIRECTIONAL_LIGHT_COUNT
  uniform DirectionalLight_1_1 uDirectionalLights[ DIRECTIONAL_LIGHT_COUNT ];
#endif

uniform vec3 uLambertDiffuse;

void main() {
  gl_FragColor = vec4(uColor, uOpacity);
  
  applyFog_3_3(gl_FragColor, uFog, vCameraDistance);
  applyNormalColor_2_4(gl_FragColor, vNormal, uNormalColorAmount);
  lambertianReflectance_4_5(gl_FragColor, uDirectionalLights, uLambertDiffuse, vNormal);
}
