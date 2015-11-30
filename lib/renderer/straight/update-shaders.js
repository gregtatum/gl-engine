'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = updateShaders;

var _glShader = require('gl-shader');

var _glShader2 = _interopRequireDefault(_glShader);

var _glGeometry = require('gl-geometry');

var _glGeometry2 = _interopRequireDefault(_glGeometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateShaders(gl, meshes) {

	for (var i = 0; i < meshes.length; i++) {

		var mesh = meshes[i];
		var material = mesh.material;
		var geometry = mesh.geometry;

		// Recompile flags
		if (material && material.flags.recompile) {

			if (material.shader) {
				material.shader.update();
			} else {
				material.shader = (0, _glShader2.default)(gl, material.vertSource, material.fragSource);
			}
		}

		// Update buffers
		if (geometry && geometry.flags.updateBuffers) {

			if (geometry.buffers) {
				// TODO
				// geometry.buffers.update()
			} else {
					geometry.buffers = (0, _glGeometry2.default)(gl);
					material.setAttributes(geometry, material.buffers);
				}
		}
	}
}