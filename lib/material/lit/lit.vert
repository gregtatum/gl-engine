#pragma glslify: applyCamera = require('../common/camera')
#pragma glslify: import('./vars.vert')

void main() {
  
  vNormal = uCamera.normal * aNormal;

  applyCamera(
    gl_Position, aPosition, uModel, uCamera,
    vCameraPosition, vCameraDistance, vCameraDirection
  );
}