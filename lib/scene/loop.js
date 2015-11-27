import CreateLoop from 'poem-loop'

export default function loop( propertiesOrBoolean ) {
	
	var properties
	
	if( typeof propertiesOrBoolean === "object" ) {
		properties = propertiesOrBoolean
	} else {
		if( propertiesOrBoolean ) {
			properties = {}
		} else {
			return null
		}
	}
	
	var loop = CreateLoop( properties )
	
	setTimeout(function() {
		loop.start()
	}, 10)
	
	// TODO - Fix this in the module
	loop.on = loop.emitter.on.bind(loop.emitter)
	loop.off = loop.emitter.removeListener.bind(loop.emitter)
	
	return loop
}