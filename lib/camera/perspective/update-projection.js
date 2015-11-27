import PerspectiveMatrix from 'gl-mat4/perspective'
export default function updateProjection( camera, canvas ) {
	
	PerspectiveMatrix(
		camera.projection,
		camera.fieldOfView,
		camera.aspectRatio * canvas.width / canvas.height,
		camera.clipping[0],
		camera.clipping[1]
	)
}