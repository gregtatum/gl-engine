import RemoveNode       from './node/remove'
import AddNode          from './node/add'
import GetChildren      from './node/children'
import GetParent        from './node/parent'
import AttachRenderer   from './attach-renderer'
import Flatten          from './flatten'
import Assign           from 'object-assign'
import GetObjectsByType from './get-objects-by-type'
import GetLights        from './get-lights'
import Map              from 'es6-map'

function Scene() {
	
	var edges = {
		children : new Map(),
		parent : new Map()
	}
	
	this.render           = function doNothing() {}
	this.renderer         = null
	this.counts           = {}
	
	this.add              = AddNode          .bind( null, this, edges )
	this.remove           = RemoveNode       .bind( null, this, edges )
	this.children         = GetChildren      .bind( null, this, edges )
	this.parent           = GetParent        .bind( null, edges )
	this.flatten          = Flatten          .bind( null, this )
	this.attachRenderer   = AttachRenderer   .bind( null, this )
	this.getLights        = GetLights        .bind( null, {} )
	this.getObjectsByType = GetObjectsByType .bind( null, {} )
	
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
