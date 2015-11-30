'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createMesh;

var _meta = require('./meta');

var _meta2 = _interopRequireDefault(_meta);

var _transform = require('../transform');

var _transform2 = _interopRequireDefault(_transform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mesh(material, geometry) {
	this.meta = (0, _meta2.default)();
	this.transform = (0, _transform2.default)();
	this.material = material;
	this.geometry = geometry;
}

function createMesh(material, geometry) {
	return new Mesh(material, geometry);
}