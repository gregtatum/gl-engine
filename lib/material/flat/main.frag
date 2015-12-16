
	gl_FragColor.rgb = color;
	gl_FragColor.a = opacity;

	#pragma glslify: import('../../augment/fog/fog-main.frag')
