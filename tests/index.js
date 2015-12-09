var Tape = require('tape')

try {
	
	require('../lib')

	//Renderers
	require('./renderer/forward-test')
	
	//Materials
	require('./material/flat-test')
	require('./material/lit-test')
	
	//Augments
	require('./material/augments/fog-flat-test')
	require('./material/augments/fog-lit-test')
	require('./material/augments/normal-color-lit-test')
	
} catch( err ) {
	// catch errors in electron, fail the tests to get a proper exit code
	Tape("javascript error", function(t) {
		t.plan(1)
		t.fail(err)
	})
}