"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = removeFromScene;
function removeFromScene(scene, object) {

	var index = scene.children.indexOf(object);

	if (index >= 0) {
		scene.children.splice(index, 1);
		scene.current.changed = true;
	}

	return scene;
}