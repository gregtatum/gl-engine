#ifdef NORMAL_COLOR
	#pragma GL_ENGINE_REQUIRES NORMAL_COLOR
	void applyNormalColor(
		inout vec4 fragment,
		in vec3 normal,
		in float amount
	) {
		fragment.rgb = mix(fragment.rgb, normal * 0.5 + 0.5, amount);
	}
#endif

#pragma glslify: export(applyNormalColor)