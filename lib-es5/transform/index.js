'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createTransform;

var _create = require('gl-mat4/create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Transform() {
	this.flags = {
		autoUpdate: true,
		useEuler: true
	}, this.position = [0, 0, 0];
	this.quaternion = [0, 0, 0, 1];
	this.euler = [0, 0, 0];
	this.eulerOrder = ['x', 'y', 'z'];
	this.scale = [1, 1, 1];
	this.local = (0, _create2.default)();
	this.global = (0, _create2.default)();
}

function createTransform() {
	return new Transform();
}