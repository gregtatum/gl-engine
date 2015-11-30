"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createMeta;
function Meta() {
	this.name = "";
	this.children = [];
}

function createMeta() {
	return new Meta();
}