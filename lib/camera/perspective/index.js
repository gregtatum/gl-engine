'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = perspective;

var _transform = require('../../transform');

var _transform2 = _interopRequireDefault(_transform);

var _create = require('gl-mat4/create');

var _create2 = _interopRequireDefault(_create);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _updateProjection = require('./update-projection');

var _updateProjection2 = _interopRequireDefault(_updateProjection);

var _updateView = require('./update-view');

var _updateView2 = _interopRequireDefault(_updateView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PerspectiveCamera(fieldOfView, aspectRatio, clipping) {
	this.transform = (0, _transform2.default)();
	this.aspectRatio = aspectRatio === undefined ? 1 : aspectRatio;
	this.clipping = clipping === undefined ? [0.01, 100] : clipping;
	this.fieldOfView = fieldOfView === undefined ? Math.PI / 4 : fov;
	this.projection = (0, _create2.default)();
	this.view = (0, _create2.default)();
	this.update = _update2.default.bind(null, this, {});
	this.updateProjection = _updateProjection2.default.bind(null, this);
	this.updateView = _updateView2.default.bind(null, this);
}

function perspective(fieldOfView, aspectRatio, clipping) {
	var camera = new PerspectiveCamera(fieldOfView, aspectRatio, clipping);

	return camera;
}