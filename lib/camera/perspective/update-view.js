'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = updateView;

var _invert = require('gl-mat4/invert');

var _invert2 = _interopRequireDefault(_invert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateView(camera) {
	(0, _invert2.default)(camera.view, camera.transform.global);
}