export default function bootEngine( engine, config, onReady ) {

	if( onReady ) {
		engine.emitter.on('ready', onReady)
	}
		
	// Defer execution start
	// TODO - async asset loading
	setTimeout(function() {
		engine.start()
		
		if( config.autoStart ) { 
			engine.loop.start()
		}
	}, 10)
	
}