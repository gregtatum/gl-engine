import ForwardRenderer from '../renderer/forward'
import Remove           from './remove'
import Add              from './add'
import AttachRenderer   from './attach-renderer'
import Flatten          from './flatten'
import RenderDone       from './render-done'
import CreateLoop       from './loop'
import Assign           from 'object-assign'
import GetObjectsByType from './get-objects-by-type'
import GetLights        from './get-lights'

function Scene( config ) {
	
	this.loop             = CreateLoop( config )
	this.emitter          = this.loop.emitter
	this.on               = this.loop.on
	this.off              = this.loop.off
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
	
	var config = Assign({
		renderer : null,
		emitter : null,
		customizeEvent : null,
		autoStart : true
	}, properties)
	
	var scene = new Scene( config )
	
	if( !config.renderer ) { config.renderer = ForwardRenderer( config ) }
	AttachRenderer( scene, config.renderer )
	
	return scene
}