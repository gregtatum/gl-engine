precision mediump float;
#define SHADER_NAME depth

uniform sampler2D uDepth;

varying vec2 vUv;

void main () {
  vec4 depth = texture2D(uDepth, vUv);
  gl_FragColor = vec4(vec3(pow(depth.r, 20.0)), 1.0);
}
