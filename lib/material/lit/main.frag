
	gl_FragColor.rgb = uColor;
	gl_FragColor.a = uOpacity;

	#pragma glslify: import('../../augment/fog/fog-main.frag')
	#pragma glslify: import('../../augment/normal-color/normal-main.frag')
	#pragma glslify: import('../../augment/lambert/main.frag')