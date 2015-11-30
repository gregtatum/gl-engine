"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = setUniforms;
function setUniforms(shader, camera, mesh) {
	shader.uniforms.projection = camera.projection;
	shader.uniforms.view = camera.view;
	shader.uniforms.model = mesh.transform.global;
	shader.uniforms.color = mesh.material.shading.color;
	shader.uniforms.opacity = mesh.material.shading.opacity;
}