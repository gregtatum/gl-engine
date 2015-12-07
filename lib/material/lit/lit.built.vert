#define GLSLIFY 1
uniform mat4 model;
attribute vec3 position;

#ifdef NORMAL
	attribute vec3 normal;
	varying vec3 vNormal;
#endif

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
	uniform CameraVert camera;
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif

#ifdef NORMAL
	uniform mat3 normalMatrix;
#endif

void main() {
	
	vNormal = camera.normal * normal;

	#ifdef CAMERA
		vec4 globalPosition = model * vec4( position, 1.0 );
		vCameraPosition = camera.position;
		vCameraDistance = distance(camera.position, globalPosition.xyz);
		vCameraDirection = normalize(camera.position - globalPosition.xyz);
		gl_Position = camera.projection * camera.view * globalPosition;
	#endif
}