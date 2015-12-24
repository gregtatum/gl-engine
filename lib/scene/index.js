import Remove           from './remove'
import Add              from './add'
import AttachRenderer   from './attach-renderer'
import Flatten          from './flatten'
import Assign           from 'object-assign'
import GetObjectsByType from './get-objects-by-type'
import GetLights        from './get-lights'

function Scene() {
	
	this.render           = function doNothing() {}
	this.renderer         = null
	this.children         = []
	this.add              = Add.bind( null, this )
	this.remove           = Remove.bind( null, this )
	this.flatten          = Flatten.bind( null, this )
	this.attachRenderer   = AttachRenderer.bind( this )
	this.counts           = {}
	this.getLights        = GetLights.bind( null, {} )
	this.getObjectsByType = GetObjectsByType.bind( null, {} )
	
	this.flags = {
		changed : true
	}
}

export default function createScene( properties ) {
	
	var scene = new Scene()
	
	if( properties && properties.renderer ) {
		AttachRenderer( scene, properties.renderer )
	}
	
	return scene
}