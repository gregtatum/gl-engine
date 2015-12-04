
	gl_FragColor.rgb = color;
	gl_FragColor.a = opacity;

	#pragma glslify: import('../augments/fog/fog-frag-main.glsl')