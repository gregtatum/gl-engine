#pragma glslify: DirectionalLight = require('../../light/directional/struct')

#if defined(LAMBERT)
  void lambertianReflectance(
    inout vec4 fragment,
    DirectionalLight directionalLights[lightCount],
    in vec3 diffuse,
    in vec3 normal
  ) {

    for(int i=0; i < lightCount; i++) {
      DirectionalLight light = directionalLights[i];
    
      float lightDotProduct = dot(normalize(normal), light.direction);
      float surfaceBrightness = max(0.0, lightDotProduct);
    
      fragment.xyz += diffuse * light.color * surfaceBrightness;
    }
  }
#endif

#pragma glslify: export(lambertianReflectance);