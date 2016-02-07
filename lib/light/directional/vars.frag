#pragma glslify: DirectionalLight = require('./struct')
#ifdef DIRECTIONAL_LIGHT_COUNT
  uniform DirectionalLight uDirectionalLights[ DIRECTIONAL_LIGHT_COUNT ];
#endif