
	gl_FragColor.rgb = uColor;
	gl_FragColor.a = uOpacity;

	#pragma glslify: import('../../augment/fog/main.frag')
	#pragma glslify: import('../../augment/normal-color/main.frag')
	#pragma glslify: import('../../augment/lambert/main.frag')