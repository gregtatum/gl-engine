#define GLSLIFY 1
uniform mat4 uModel;
attribute vec3 aPosition;

#ifdef CAMERA
	struct Camera {
		vec3 position;
		mat4 view;
		mat4 projection;
		mat4 modelView;
		mat3 normal;
	};
#endif

#ifdef CAMERA
	uniform Camera uCamera;
	varying vec3 vCameraPosition;
	varying vec3 vCameraDirection;
	varying float vCameraDistance;
#endif

void main() {
	
	#ifdef CAMERA
		vec4 globalPosition = uModel * vec4( aPosition, 1.0 );
		vCameraPosition = uCamera.position;
		vCameraDistance = distance(uCamera.position, globalPosition.xyz);
		vCameraDirection = normalize(uCamera.position - globalPosition.xyz);
		gl_Position = uCamera.projection * uCamera.view * globalPosition;
	#endif
}
