import Controller   from 'orbit-controls'
import Update       from './update'
import { distance as Distance } from 'gl-vec3'

function OrbitControls( camera, properties ) {
	
	var controls = Controller( properties )
	
	controls.camera           = camera
	controls.updateController = controls.update
	controls.update           = Update.bind( null, controls )
	
	return controls
}

export default function createOrbitControls( camera, properties ) {
	
	return OrbitControls( camera, properties )
}