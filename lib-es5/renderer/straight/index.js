'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createStraightRenderer;

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _webglContext = require('webgl-context');

var _webglContext2 = _interopRequireDefault(_webglContext);

var _autoAddCanvas = require('./auto-add-canvas');

var _autoAddCanvas2 = _interopRequireDefault(_autoAddCanvas);

var _autoResizeCanvas = require('./auto-resize-canvas');

var _autoResizeCanvas2 = _interopRequireDefault(_autoResizeCanvas);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StraightRenderer(gl, config, clear) {

	var removeCanvas = (0, _autoAddCanvas2.default)(gl.canvas, config.parentEl, config.autoAddCanvas);
	var removeResize = (0, _autoResizeCanvas2.default)(gl.canvas, config.parentEl, config.autoResizeCanvas);

	this.gl = gl;
	this.canvas = gl.canvas;
	this.render = _render2.default.bind(null, this);
	this.clear = clear;
	this.destroy = function destroy() {
		removeCanvas();
		removeResize();
	};
}

function createStraightRenderer(properties) {

	var config = (0, _objectAssign2.default)({
		autoAddCanvas: true,
		autoResizeCanvas: true,
		canvas: null,
		width: null,
		height: null,
		parentEl: document.body
	}, // Plus WebGLContextAttributes: https://www.khronos.org/registry/webgl/specs/1.0/#5.2
	// alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer,
	// preferLowPowerToHighPerformance, failIfMajorPerformanceCaveat
	properties);

	var clear = (0, _objectAssign2.default)({
		color: [1, 1, 1, 1],
		depth: true,
		stencil: true
	}, properties.clear);

	var gl = (0, _webglContext2.default)(config);
	if (!gl) {
		return null;
	}

	return new StraightRenderer(gl, config, clear);
}