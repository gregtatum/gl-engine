precision mediump float;
#define SHADER_NAME bloom

uniform sampler2D tInput;

uniform float uResolutionRatio;
uniform float uIntensity;
uniform float uKernelSize;
uniform float uPower;

varying vec2 vUv;

void main () {
  vec4 sum = vec4(0);
  vec2 texcoord = vUv;

  for (int i= -4; i < 4; i++) {
    for (int j = -4; j < 4; j++) {
      // offset by a ratio of the Y resolution size
      vec2 offset = vec2(float(j) * uResolutionRatio, i) * uKernelSize;
      sum += texture2D(tInput, texcoord + offset);
    }
  }

  //Make the bloom between 0 and 1
  sum *= 0.0625; // divide by 16

  vec4 bloom = vec4(
    pow(sum.x, uPower),
    pow(sum.y, uPower),
    pow(sum.z, uPower),
    pow(sum.w, uPower)
  ) * uIntensity * 0.05;

  gl_FragColor = bloom + texture2D(tInput, texcoord);
}
