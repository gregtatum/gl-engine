import Render from './render'
import WebGLContext from 'webgl-context'
import AutoAddCanvas from './auto-add-canvas'
import AutoResizeCanvas from './auto-resize-canvas'
import Assign from 'object-assign'
import EventEmitter from 'eventemitter3'
import ShaderCache from '../shader-cache'

function ForwardRenderer (gl, config, clear) {
  var removeCanvas = AutoAddCanvas(gl.canvas, config.parentEl, config.autoAddCanvas)
  var removeResize = AutoResizeCanvas(gl.canvas, config.parentEl, config.autoResizeCanvas)

  this.gl = gl
  this.canvas = gl.canvas
  this.render = Render.bind(null, this, ShaderCache())
  this.clear = clear
  this.emitter = config.emitter
  this.on = config.emitter.on.bind(config.emitter)
  this.off = config.emitter.off.bind(config.emitter)
  this.emitter = config.emitter
  this.destroy = function destroy () {
    removeCanvas()
    removeResize()
  }
}

export default function createForwardRenderer (properties) {
  var config = Assign({
    autoAddCanvas: true,
    autoResizeCanvas: true,
    canvas: null,
    width: null,
    height: null,
    parentEl: document.body,
    emitter: null
  // Plus WebGLContextAttributes: https://www.khronos.org/registry/webgl/specs/1.0/#5.2
  // alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer,
  // preferLowPowerToHighPerformance, failIfMajorPerformanceCaveat
  }, properties)

  if (!config.emitter) { config.emitter = new EventEmitter() }

  var clear = Assign({
    color: [1, 1, 1, 1],
    colorBuffer: true,
    depthBuffer: true,
    stencilBuffer: true
  }, config.clear)

  var gl = WebGLContext(config)
  if (!gl) { return null }

  return new ForwardRenderer(gl, config, clear)
}
