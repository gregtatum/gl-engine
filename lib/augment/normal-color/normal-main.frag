
	#ifdef NORMAL_COLOR
		gl_FragColor.rgb = mix(
			gl_FragColor.rgb,
			vNormal * 0.5 + 0.5,
			uNormalColorAmount
		);
	#endif