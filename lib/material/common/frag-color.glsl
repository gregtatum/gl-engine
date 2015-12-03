#define GLSLIFY 1
gl_FragColor.rgb = color;
gl_FragColor.a = opacity;

#ifdef FOG
	float fogFactorLinear_0_0(
  const float dist,
  const float start,
  const float end
) {
  return 1.0 - clamp((end - dist) / (end - start), 0.0, 1.0);
}

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fog.color, fogFactorLinear_0_0( camera.dist, fog.near, fog.far) )
#endif