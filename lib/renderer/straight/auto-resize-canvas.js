'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = autoResizeCanvas;

var _canvasFit = require('canvas-fit');

var _canvasFit2 = _interopRequireDefault(_canvasFit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autoResizeCanvas(canvas, parentEl, doAutoResize) {

	if (doAutoResize) {

		var resize = (0, _canvasFit2.default)(canvas, parentEl);
		window.addEventListener('resize', resize, false);
		resize();

		return function stopResizeHandler() {
			window.removeEventListener('resize', resize, false);
		};
	}

	return function doNothing() {};
}