export default function useControls( camera, createControls, settings ) {
	camera.controls = createControls( camera, settings )
	camera.updateControls = camera.controls.update
	return camera
}