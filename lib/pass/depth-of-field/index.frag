precision mediump float;
#define SHADER_NAME depth-of-field

uniform sampler2D uInput;
uniform sampler2D uDepthTexture;
uniform float uResolutionRatio;
uniform float uKernelSize;
uniform float uFocus;
uniform float uDepth;

varying vec2 vUv;

void main () {
  vec4 sum = vec4(0);
  float distanceFromCamera = uDepth * abs(uFocus - texture2D(uDepthTexture, vUv).r);

  for (int i = -3; i <= 3; i++) {
    for (int j = -3; j <= 3; j++) {
      // offset by a ratio of the Y resolution size
      vec2 offset = vec2(float(j) * uResolutionRatio, i);

      // Adjust offset for the distance the point is from the camera
      offset *= uKernelSize * distanceFromCamera;

      sum += texture2D(uInput, vUv + offset);
    }
  }

  //Make the bloom between 0 and 1
  sum.xyz *= 0.02040816326531; // 1/49

  gl_FragColor = vec4(sum.xyz, 1.0);
  // gl_FragColor = sum;
  // gl_FragColor = texture2D(uInput, vUv);
  // gl_FragColor.xyz = vec3(distanceFromCamera);
  // gl_FragColor.xyz = texture2D(uDepthTexture, vUv).rgb;
}
