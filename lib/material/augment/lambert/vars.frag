
#if defined(LAMBERT) && defined(DIRECTIONAL_LIGHT_COUNT)
	
	uniform vec3 lambertDiffuse;
	
	#if DIRECTIONAL_LIGHT_COUNT > 0
		void lambertianReflectance( inout vec3 color ) {

			for( int i=0; i < DIRECTIONAL_LIGHT_COUNT; i++ ) {
			
				DirectionalLight light = directionalLights[i];
			
			    float lightDotProduct = dot( normalize(vNormal), light.direction );
			    float surfaceBrightness = max( 0.0, lightDotProduct );
			
				color += lambertDiffuse * light.color * surfaceBrightness;
			}
		}
	#endif
	#if DIRECTIONAL_LIGHT_COUNT == 0
		void lambertianReflectance( inout vec3 color ) {
			// Do nothing
		}
	#endif
	
#endif