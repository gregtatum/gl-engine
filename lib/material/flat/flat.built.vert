#define GLSLIFY 1
uniform mat4 model;
attribute vec3 position;

#ifdef CAMERA
	struct CameraVert {
		vec3 position;
		mat4 view;
		mat4 projection;
		mat4 modelView;
		mat3 normal;
	};
#endif

#ifdef CAMERA
	uniform CameraVert uCamera;
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif

#ifdef NORMAL
	uniform mat3 normalMatrix;
#endif

void main() {
	
	#ifdef CAMERA
		vec4 globalPosition = model * vec4( position, 1.0 );
		vCameraPosition = uCamera.position;
		vCameraDistance = distance(uCamera.position, globalPosition.xyz);
		vCameraDirection = normalize(uCamera.position - globalPosition.xyz);
		gl_Position = uCamera.projection * uCamera.view * globalPosition;
	#endif
}
