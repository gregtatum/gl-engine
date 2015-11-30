'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = updateEuler;

var _identity = require('gl-quat/identity');

var _identity2 = _interopRequireDefault(_identity);

var _rotateX = require('gl-quat/rotateX');

var _rotateX2 = _interopRequireDefault(_rotateX);

var _rotateY = require('gl-quat/rotateY');

var _rotateY2 = _interopRequireDefault(_rotateY);

var _rotateZ = require('gl-quat/rotateZ');

var _rotateZ2 = _interopRequireDefault(_rotateZ);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rotate = {
	x: _rotateX2.default,
	y: _rotateY2.default,
	z: _rotateZ2.default
};

function updateEuler(transform) {

	if (transform.flags.useEuler) {
		var quat = transform.quaternion;

		var rotateA = rotate[transform.eulerOrder[0]];
		var rotateB = rotate[transform.eulerOrder[1]];
		var rotateC = rotate[transform.eulerOrder[2]];

		(0, _identity2.default)(quat);
		rotateA(quat, quat, transform.euler[0]);
		rotateB(quat, quat, transform.euler[1]);
		rotateC(quat, quat, transform.euler[2]);
	}
}