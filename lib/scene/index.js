import StraightRenderer from '../renderer/straight'
import Remove           from './remove'
import Add              from './add'
import AttachRenderer   from './attach-renderer'
import Flatten          from './flatten'
import RenderDone       from './render-done'
import CreateLoop       from './loop'
import Assign           from 'object-assign'

function Scene( config ) {
	
	this.loop           = CreateLoop( config )
	this.render         = function doNothing() {}
	this.renderer       = null
	this.children       = []
	this.add            = Add.bind( null, this )
	this.remove         = Remove.bind( null, this )
	this.flatten        = Flatten.bind( null, this )
	this.attachRenderer = AttachRenderer.bind( this )
	
	this.current = {
		changed : true
	}
}

export default function createScene( properties ) {
	
	var config = Assign({
		renderer : null,
		emitter : null,
		customizeEvent : null,
		autoStart : true
	}, properties)
	
	var scene = new Scene( config )
	
	if( !config.renderer ) { config.renderer = StraightRenderer( config ) }
	AttachRenderer( scene, config.renderer )
	
	return scene
}