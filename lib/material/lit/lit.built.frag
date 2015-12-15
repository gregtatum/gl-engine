#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME lit material

uniform vec3 color;
uniform float opacity;
varying vec3 vNormal;

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

	uniform Fog fog;
	
	float calculateFog(
		const float dist,
		const float start,
		const float end
	) {
		return 1.0 - clamp((end - dist) / (end - start), 0.0, 1.0);
	}
#endif

#ifdef NORMAL_COLOR
	uniform float normalColorAmount;
#endif

//-----lights/directional/vars.frag------
#if defined(DIRECTIONAL_LIGHT_COUNT) && DIRECTIONAL_LIGHT_COUNT > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ DIRECTIONAL_LIGHT_COUNT ];
#endif
//----------------

//----augment/lambert/vars.frag-------------
#if defined(LAMBERT) && defined(DIRECTIONAL_LIGHT_COUNT)

	#if DIRECTIONAL_LIGHT_COUNT > 0
		void lambertianReflectance( inout vec3 color ) {
		
			vec3 surfaceColor = color;
			color = vec3( 0.0, 0.0, 0.0 );
		
			for( int i=0; i < DIRECTIONAL_LIGHT_COUNT; i++ ) {
			
				DirectionalLight light = directionalLights[i];
			
			    float lightDotProduct = dot( normalize(vNormal), light.direction );
			    float surfaceBrightness = max( 0.0, lightDotProduct );
			
				color += surfaceColor * light.color * surfaceBrightness;
			}
		}
	#endif
	#if DIRECTIONAL_LIGHT_COUNT == 0
		void lambertianReflectance( inout vec3 color ) {
			// Black if no lights
			color = vec3( 0.0, 0.0, 0.0 );
		}
	#endif
	
#endif
//----------------

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
	
	//----augment/lambert/vars.frag-------------
	#if defined(LAMBERT) && defined(DIRECTIONAL_LIGHT_COUNT)
		lambertianReflectance( gl_FragColor.rgb );
	#endif
	//-------------------------------------
}
