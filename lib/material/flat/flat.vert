#define SHADER_NAME flat.vert

#pragma glslify: applyCamera = require('../common/camera')
#pragma glslify: import('./vars.vert')

void main() {
  applyCamera(
    gl_Position, aPosition, uModel, uCamera,
    vCameraPosition, vCameraDistance, vCameraDirection
  );
}
