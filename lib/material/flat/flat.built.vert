#define GLSLIFY 1
#define SHADER_NAME flat.vert

struct Camera_0_0 {
	vec3 position;
	mat4 view;
	mat4 projection;
	mat4 modelView;
	mat3 normal;
};

#pragma GLAM_REQUIRES CAMERA
void applyCamera_1_1(
	inout vec4 result,
	vec3 position,
	mat4 model,
	Camera_0_0 camera,
	inout vec3 cameraPosition,
	inout float cameraDistance,
	inout vec3 cameraDirection
) {
	vec4 globalPosition = model * vec4( position, 1.0 );
	cameraPosition = camera.position;
	cameraDistance = distance(camera.position, globalPosition.xyz);
	cameraDirection = normalize(camera.position - globalPosition.xyz);
	result = camera.projection * camera.view * globalPosition;
}

uniform mat4 uModel;
attribute vec3 aPosition;

uniform Camera_0_0 uCamera;
varying vec3 vCameraPosition;
varying vec3 vCameraDirection;
varying float vCameraDistance;

void main() {
  applyCamera_1_1(
    gl_Position, aPosition, uModel, uCamera,
    vCameraPosition, vCameraDistance, vCameraDirection
  );
}
