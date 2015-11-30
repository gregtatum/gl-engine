"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = setScenesRenderer;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function setScenesRenderer(scene, renderer) {

	var render;

	if ((typeof renderer === "undefined" ? "undefined" : _typeof(renderer)) === "object" && typeof renderer.render === "function") {
		scene.renderer = renderer;
		scene.render = renderer.render.bind(null, scene);
	}

	return scene;
}