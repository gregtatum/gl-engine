'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = renderStraightScene;

var _update = require('../../transform/update');

var _update2 = _interopRequireDefault(_update);

var _updateShaders = require('./update-shaders');

var _updateShaders2 = _interopRequireDefault(_updateShaders);

var _renderDone = require('../../scene/render-done');

var _renderDone2 = _interopRequireDefault(_renderDone);

var _clear = require('./clear');

var _clear2 = _interopRequireDefault(_clear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderStraightScene(renderer, scene, camera) {

	var gl = renderer.gl;
	var meshes = scene.flatten();

	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	(0, _clear2.default)(gl, renderer.clear);

	if (scene.current.changed) {
		(0, _updateShaders2.default)(renderer.gl, meshes);
	}

	(0, _update2.default)(camera.transform);
	camera.update(renderer.canvas);

	for (var i = 0; i < meshes.length; i++) {

		var mesh = meshes[i];
		var material = mesh.material;
		var geometry = mesh.geometry;

		if (material && geometry) {

			geometry.buffers.bind(material.shader);
			(0, _update2.default)(mesh.transform);
			material.setUniforms(material.shader, camera, mesh);
			geometry.buffers.draw(gl[material.mode]);
			geometry.buffers.unbind();
		}
	}

	(0, _renderDone2.default)(scene);
}