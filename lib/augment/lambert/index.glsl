#pragma glslify: DirectionalLight = require('../../light/directional/struct')

#if defined(LAMBERT) && defined(DIRECTIONAL_LIGHT_COUNT) && DIRECTIONAL_LIGHT_COUNT > 0
  #pragma GL_ENGINE_REQUIRES LAMBERT && DIRECTIONAL_LIGHT_COUNT
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