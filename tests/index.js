var Tape = require('tape')

try {
	require('./material/lit/lit-test')
	
	require('../lib')
	require('./renderer/forward-test')
	require('./material/flat/flat-test')
	require('./material/fog/flat-fog-test')
	require('./material/fog/lit-fog-test')
	
} catch( err ) {
	// catch errors in electron, fail the tests to get a proper exit code
	Tape("javascript error", function(t) {
		t.plan(1)
		t.fail(err)
	})
}