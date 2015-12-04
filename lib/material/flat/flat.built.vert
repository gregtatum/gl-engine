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
		vCameraPosition = camera.position;
		vCameraDistance = distance(camera.position, position);
		vCameraDirection = normalize(camera.position - position);
		gl_Position = camera.projection * camera.view * model * vec4( position, 1.0 );
	#endif
	
}
