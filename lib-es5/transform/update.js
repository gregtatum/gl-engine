'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = updateTransform;

var _fromQuat = require('gl-mat4/fromQuat');

var _fromQuat2 = _interopRequireDefault(_fromQuat);

var _create = require('gl-mat4/create');

var _create2 = _interopRequireDefault(_create);

var _fromRotationTranslation = require('gl-mat4/fromRotationTranslation');

var _fromRotationTranslation2 = _interopRequireDefault(_fromRotationTranslation);

var _multiply = require('gl-mat4/multiply');

var _multiply2 = _interopRequireDefault(_multiply);

var _scale = require('gl-mat4/scale');

var _scale2 = _interopRequireDefault(_scale);

var _identity = require('gl-mat4/identity');

var _identity2 = _interopRequireDefault(_identity);

var _copy = require('gl-mat4/copy');

var _copy2 = _interopRequireDefault(_copy);

var _updateEuler = require('./update-euler');

var _updateEuler2 = _interopRequireDefault(_updateEuler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rotationTranslation = (0, _create2.default)();
var scale = (0, _create2.default)();

function updateTransform(transform) {

	if (transform.flags.autoUpdate) {

		(0, _updateEuler2.default)(transform);
		(0, _fromRotationTranslation2.default)(rotationTranslation, transform.quaternion, transform.position);
		(0, _identity2.default)(scale);
		(0, _scale2.default)(scale, scale, transform.scale);
		(0, _multiply2.default)(transform.local, rotationTranslation, scale);

		// TODO - Pull this out somewhere else to allow nested objects
		(0, _copy2.default)(transform.global, transform.local);
	}
}