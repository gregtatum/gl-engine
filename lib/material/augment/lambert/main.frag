
	#if defined(LAMBERT) && defined(DIRECTIONAL_LIGHT_COUNT)
		lambertianReflectance( gl_FragColor.rgb );
	#endif