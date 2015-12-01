var Tape = require('tape')

try {
	require('../lib')
	require('./material/flat/flat-test')
	require('./renderer/straight-test')
} catch( err ) {
	// catch errors in electron, fail the tests to get a proper exit code
	Tape("javascript error", function(t) {
		t.plan(1)
		t.fail(err)
	})
}