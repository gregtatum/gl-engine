
export default function updateProjection( camera, previous, canvas ) {
	
	camera.updateView()

	// TODO - Re-evaluate this approach
	
	if(
		previous.aspectRatio !== camera.aspectRatio ||
		previous.clipping0 !== camera.clipping[0] ||
		previous.clipping1 !== camera.clipping[1] ||
		previous.fieldOfView !== camera.fieldOfView ||
		previous.canvasWidth !== canvas.width ||
		previous.canvasHeight !== canvas.height
	) {
		camera.updateProjection( canvas )
	}
	
	previous.aspectRatio = camera.aspectRatio
	previous.clipping0 = camera.clipping[0]
	previous.clipping1 = camera.clipping[1]
	previous.fieldOfView = camera.fieldOfView
	previous.canvasWidth = canvas.width
	previous.canvasHeight = canvas.height
	
	
}