import PerspectiveMatrix from 'gl-mat4/perspective'
export default function updateProjection( camera ) {
	
	PerspectiveMatrix(
		camera.projection,
		camera.fieldOfView,
		camera.aspectRatio,
		camera.clipping[0],
		camera.clipping[1]
	)
}