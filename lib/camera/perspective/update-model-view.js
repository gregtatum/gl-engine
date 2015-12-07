import Multiply from 'gl-mat4/multiply'

export default function updateModelView( camera, model ) {
	
	Multiply(
		camera.modelView,
		camera.view,
		model
	)
}