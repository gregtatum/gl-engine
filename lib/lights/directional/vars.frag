
#ifdef DIRECTIONAL_LIGHT_COUNT > 0
	float lightDotProduct = dot( normalize(vNormal), light );
	float surfaceBrightness = max( 0.0, lightDotProduct );
#endif