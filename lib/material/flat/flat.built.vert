#define GLSLIFY 1
#define SHADER_NAME flat material

#ifdef CAMERA
	struct Camera_0_0 {
		vec3 position;
		mat4 view;
		mat4 projection;
		mat4 modelView;
		mat3 normal;
	};
#endif

#ifdef CAMERA
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
#else
	void applyCamera_1_1(
		inout vec4 result,
		vec3 position,
		mat4 model,
		Camera_0_0 camera,
		inout vec3 cameraPosition,
		inout vec3 cameraDistance,
		inout float cameraDirection
	) { }
#endif

uniform mat4 uModel;
attribute vec3 aPosition;

// START: flat.frag: import('../common/camera/vars.vert')

#ifdef CAMERA
	uniform Camera_0_0 uCamera;
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif
// END: flat.frag: import('../common/camera/vars.vert')

void main() {
	applyCamera_1_1(
		gl_Position, aPosition, uModel, uCamera,
		vCameraPosition, vCameraDistance, vCameraDirection
	);
}
