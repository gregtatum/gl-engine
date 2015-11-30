'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createFlatMaterial;

var _glShader = require('gl-shader');

var _glShader2 = _interopRequireDefault(_glShader);

var _setUniforms = require('./set-uniforms');

var _setUniforms2 = _interopRequireDefault(_setUniforms);

var _setAttributes = require('./set-attributes');

var _setAttributes2 = _interopRequireDefault(_setAttributes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var fragSource = fs.readFileSync(__dirname + '/flat.frag', 'utf8');
var vertSource = fs.readFileSync(__dirname + '/flat.vert', 'utf8');

function FlatMaterial() {

	this.flags = {
		visible: true,
		transparent: false,
		recompile: true
	};

	this.fragSource = fragSource;
	this.vertSource = vertSource;

	this.shader = null;
	this.mode = "TRIANGLES";
	this.setUniforms = _setUniforms2.default;
	this.setAttributes = _setAttributes2.default;
	this.shading = {
		color: [0.1, 0.1, 0.1],
		opacity: 1.0
	};
}

function createFlatMaterial() {
	return new FlatMaterial();
}