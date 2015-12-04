
	#ifdef FOG
		gl_FragColor.rgb = mix(
			gl_FragColor.rgb,
			fog.color,
			calculateFog( vCameraDistance, fog.near, fog.far)
		);
	#endif
