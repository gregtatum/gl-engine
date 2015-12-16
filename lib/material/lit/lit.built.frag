#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME lit material

uniform vec3 uColor;
uniform float uOpacity;
varying vec3 vNormal;

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
	
	float calculateFog(
		const float cameraDistance,
		const float near,
		const float far
	) {
		return 1.0 - clamp((far - cameraDistance) / (far - near), 0.0, 1.0);
	}
#endif

#ifdef NORMAL_COLOR
	uniform float uNormalColorAmount;
#endif

#if defined(DIRECTIONAL_LIGHT_COUNT) && DIRECTIONAL_LIGHT_COUNT > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight uDirectionalLights[ DIRECTIONAL_LIGHT_COUNT ];
#endif

#if defined(LAMBERT) && defined(DIRECTIONAL_LIGHT_COUNT)
	
	uniform vec3 uLambertDiffuse;
	
	#if DIRECTIONAL_LIGHT_COUNT > 0
		void lambertianReflectance( inout vec3 color ) {

			for( int i=0; i < DIRECTIONAL_LIGHT_COUNT; i++ ) {
			
				DirectionalLight light = uDirectionalLights[i];
			
			    float lightDotProduct = dot( normalize(vNormal), light.direction );
			    float surfaceBrightness = max( 0.0, lightDotProduct );
			
				color += uLambertDiffuse * light.color * surfaceBrightness;
			}
		}
	#endif
	#if DIRECTIONAL_LIGHT_COUNT == 0
		void lambertianReflectance( inout vec3 color ) {
			// Do nothing
		}
	#endif
	
#endif

void main() {
	
	gl_FragColor.rgb = uColor;
	gl_FragColor.a = uOpacity;

	
	#ifdef FOG
		gl_FragColor.rgb = mix(
			gl_FragColor.rgb,
			uFog.color,
			calculateFog( vCameraDistance, uFog.near, uFog.far)
		);
	#endif
	
	#ifdef NORMAL_COLOR
		gl_FragColor.rgb = mix(
			gl_FragColor.rgb,
			vNormal * 0.5 + 0.5,
			uNormalColorAmount
		);
	#endif
	
	#if defined(LAMBERT) && defined(DIRECTIONAL_LIGHT_COUNT)
		lambertianReflectance( gl_FragColor.rgb );
	#endif
}
