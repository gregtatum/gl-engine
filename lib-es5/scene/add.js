"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = addToScene;
function addToScene(scene, object) {

	scene.children.push(object);
	scene.current.changed = true;
	return scene;
}