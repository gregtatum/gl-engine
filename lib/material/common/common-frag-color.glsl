gl_FragColor.rgb = color;
gl_FragColor.a = opacity;

#pragma glslify: import('../augments/fog/frag-color.glsl')