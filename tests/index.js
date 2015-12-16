var Tape = require('tape')

try {
	
	require('../lib')

	//Renderers
	require('./renderer/forward-test')
	
	//Materials
	require('./material/flat-test')
	require('./material/lit-test')
	
	//Augments
	require('./augments/fog-flat-test')
	require('./augments/fog-lit-test')
	require('./augments/normal-color-lit-test')
	require('./augments/lambert-lit-test')
	
} catch( err ) {
	// catch errors in electron, fail the tests to get a proper exit code
	Tape("javascript error", function(t) {
		t.plan(1)
		t.fail(err)
	})
}