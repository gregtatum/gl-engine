'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = updateProjection;

var _perspective = require('gl-mat4/perspective');

var _perspective2 = _interopRequireDefault(_perspective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateProjection(camera, canvas) {

	(0, _perspective2.default)(camera.projection, camera.fieldOfView, camera.aspectRatio * canvas.width / canvas.height, camera.clipping[0], camera.clipping[1]);
}