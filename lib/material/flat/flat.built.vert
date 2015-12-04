#define GLSLIFY 1
uniform mat4 model;

#ifdef CAMERA
	struct CameraVert {
		vec3 position;
		mat4 view;
		mat4 projection;
	};
#endif

#ifdef CAMERA
	attribute vec3 position;
	uniform CameraVert camera;
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif

void main() {
	
	#ifdef CAMERA
		vec4 globalPosition = model * vec4( position, 1.0 );
		vCameraPosition = camera.position;
		vCameraDistance = distance(camera.position, globalPosition.xyz);
		vCameraDirection = normalize(camera.position - globalPosition.xyz);
		gl_Position = camera.projection * camera.view * globalPosition;
	#endif
	
}
