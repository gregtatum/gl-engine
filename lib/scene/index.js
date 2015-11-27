import StraightRenderer from '../renderer/straight'
import Remove           from './remove'
import Add              from './add'
import AttachRenderer   from './attach-renderer'
import Flatten          from './flatten'
import RenderDone       from './render-done'
import CreateLoop       from './loop'

function GlamScene( properties ) {
	
	this.loop       = CreateLoop( properties )
	this.render     = function doNothing() {}
	this.children   = []
	this.add        = Add.bind( null, this )
	this.remove     = Remove.bind( null, this )
	this.flatten    = Flatten.bind( null, this )
	this.renderDone = RenderDone.bind( null, this )
	
	this.current = {
		changed : true
	}
}

export default function createGlamScene( properties ) {
	
	var scene = new GlamScene( properties || {} )
	
	// TODO - Figure out passing a renderer in by properties
	if( !properties || properties.renderer === undefined ) {
		var renderer = StraightRenderer()
		AttachRenderer( scene, renderer )
	}
	
	return scene
}