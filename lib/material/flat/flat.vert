#define SHADER_NAME flat material
#pragma glslify: import('./vars.vert')

#pragma glslify: applyCamera = require('../common/camera')

void main() {
	applyCamera(
		gl_Position, aPosition, uModel, uCamera,
		vCameraPosition, vCameraDistance, vCameraDirection
	);
}
