"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = clear;
function clear(gl, config) {

	gl.clearColor(config.color[0], config.color[1], config.color[2], config.color[3]);

	var clearBits = 0;

	if (config.color) clearBits |= gl.COLOR_BUFFER_BIT;
	if (config.depth) clearBits |= gl.DEPTH_BUFFER_BIT;
	if (config.stencil) clearBits |= gl.STENCIL_BUFFER_BIT;

	if (clearBits) {
		gl.clear(clearBits);
	}
}