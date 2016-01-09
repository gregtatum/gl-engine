
	#ifdef FOG
		gl_FragColor.rgb = mix(
			gl_FragColor.rgb,
			uFog.color,
			calculateFog( vCameraDistance, uFog.near, uFog.far)
		);
	#endif