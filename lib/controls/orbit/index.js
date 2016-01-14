import Controller   from 'orbit-controls'
import Assign       from 'object-assign'
import Update       from './update'
import { distance as Distance } from 'gl-vec3'

function OrbitControls( camera, properties ) {
	
	Assign( this, Controller( properties ) )
	
	this.camera           = camera
	this.updateController = this.update
	this.update           = Update.bind( null, this )
}

export default function createOrbitControls( camera, properties ) {
	
	return new OrbitControls( camera, properties )
}