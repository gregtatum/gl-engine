#define GLSLIFY 1
gl_FragColor.rgb = color;
gl_FragColor.a = opacity;

#ifdef FOG
	gl_FragColor.rgb = mix(
		gl_FragColor.rgb,
		fog.color,
		calculateFog( camera.dist, fog.near, fog.far)
	);
#endif
