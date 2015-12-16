
	gl_FragColor.rgb = color;
	gl_FragColor.a = opacity;

	#pragma glslify: import('../../augment/fog/fog-main.frag')
	#pragma glslify: import('../../augment/normal-color/normal-main.frag')
	#pragma glslify: import('../../augment/lambert/main.frag')