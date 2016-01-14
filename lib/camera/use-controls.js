export default function useControls( camera, createControls, settings ) {
	
	var baseUpdate = camera.update
	camera.controls = createControls( camera, settings )
	camera.flags.autoUpdateControls = true
	
	camera.update = function updateCamera( canvas ) {
		camera.controls.update()
		baseUpdate( canvas )
	}
	return camera
}