"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = loop;

var _poemLoop = require("poem-loop");

var _poemLoop2 = _interopRequireDefault(_poemLoop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function loop(propertiesOrBoolean) {

	var properties;

	if ((typeof propertiesOrBoolean === "undefined" ? "undefined" : _typeof(propertiesOrBoolean)) === "object") {
		properties = propertiesOrBoolean;
	} else {
		if (propertiesOrBoolean) {
			properties = {};
		} else {
			return null;
		}
	}

	var loop = (0, _poemLoop2.default)(properties);

	// TODO - uhhh... this is hacky... maybe have a start callback somewhere

	if (properties.autoStart) {
		setTimeout(function () {
			loop.start();
		}, 10);
	}

	// TODO - Fix this in the module
	loop.on = loop.emitter.on.bind(loop.emitter);
	loop.off = loop.emitter.removeListener.bind(loop.emitter);

	return loop;
}