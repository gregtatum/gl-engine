#ifdef FOG
	#pragma glslify: calculateFog = require(glsl-fog/linear)
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fog.color, calculateFog( camera.dist, fog.near, fog.far) )
#endif