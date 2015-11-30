'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = setAttributes;
function setAttributes(geometry) {
	geometry.buffers.attr('position', geometry.data.positions);
	geometry.buffers.faces(geometry.data.cells);
}