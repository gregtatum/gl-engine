import RemoveNode       from './node/remove'
import AddNode          from './node/add'
import GetChildren      from './node/children'
import GetParent        from './node/parent'
import AttachRenderer   from './attach-renderer'
import GetByType        from './get-by-type'
import UpdateTransforms from './update-transforms' 
import Map              from 'es6-map'
import Assign           from 'object-assign'

function Scene() {
	
	var graph = {
		children : new Map(),
		parent   : new Map(),
		types    : {},
	}
	
	this.flags    = { changed : true }
	this.render   = function doNothing() {}
	this.renderer = null

	this.add              = AddNode          .bind( null, this, graph )
	this.remove           = RemoveNode       .bind( null, this, graph )
	this.children         = GetChildren      .bind( null, this, graph )
	this.parent           = GetParent        .bind( null, graph )
	this.attachRenderer   = AttachRenderer   .bind( null, this )
	this.getByType        = GetByType        .bind( null, graph )
	this.updateTransforms = UpdateTransforms .bind( null, this, graph )
}

export default function createScene( properties ) {
	
	var scene = new Scene()
	
	if( properties && properties.renderer ) {
		AttachRenderer( scene, properties.renderer )
	}
	
	return scene
}
