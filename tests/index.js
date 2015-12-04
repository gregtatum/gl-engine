var Tape = require('tape')

try {
	require('../lib')
	require('./renderer/forward-test')
	require('./material/fog/fog-test')
	require('./material/flat/flat-test')
	
} catch( err ) {
	// catch errors in electron, fail the tests to get a proper exit code
	Tape("javascript error", function(t) {
		t.plan(1)
		t.fail(err)
	})
}