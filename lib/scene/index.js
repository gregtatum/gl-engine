'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = createScene;

var _straight = require('../renderer/straight');

var _straight2 = _interopRequireDefault(_straight);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _attachRenderer = require('./attach-renderer');

var _attachRenderer2 = _interopRequireDefault(_attachRenderer);

var _flatten = require('./flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _renderDone = require('./render-done');

var _renderDone2 = _interopRequireDefault(_renderDone);

var _loop = require('./loop');

var _loop2 = _interopRequireDefault(_loop);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Scene(config) {

	this.loop = (0, _loop2.default)(config);
	this.render = function doNothing() {};
	this.renderer = null;
	this.children = [];
	this.add = _add2.default.bind(null, this);
	this.remove = _remove2.default.bind(null, this);
	this.flatten = _flatten2.default.bind(null, this);
	this.attachRenderer = _attachRenderer2.default.bind(this);

	this.current = {
		changed: true
	};
}

function createScene(properties) {

	var config = (0, _objectAssign2.default)({
		renderer: null,
		emitter: null,
		customizeEvent: null,
		autoStart: true
	}, properties);

	var scene = new Scene(config);

	if (!config.renderer) {
		config.renderer = (0, _straight2.default)(config);
	}
	(0, _attachRenderer2.default)(scene, config.renderer);

	return scene;
}