#pragma glslify: DirectionalLight = require('./struct')
#if defined(DIRECTIONAL_LIGHT_COUNT) && DIRECTIONAL_LIGHT_COUNT > 0
  uniform DirectionalLight uDirectionalLights[ DIRECTIONAL_LIGHT_COUNT ];
#endif