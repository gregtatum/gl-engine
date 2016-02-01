import ForwardRenderer from '../renderer/forward'
import CreateLoop from './loop'
import Boot from './boot'
import Assign from 'object-assign'
import Scene from '../scene'
import Start from './start/'
import EventEmitter from 'eventemitter3'

function Engine (config) {
  this.loop = CreateLoop(config)
  this.emitter = this.loop.emitter
  this.on = this.loop.on
  this.off = this.loop.off
  this.start = Start.bind(null, this)
  this.scene = null
  this.renderer = null
}

function createEngine (properties, onReady) {
  var config = Assign({
    renderer: undefined,
    scene: undefined,
    emitter: new EventEmitter(),
    customizeEvent: undefined,
    autoStart: true
  }, properties)

  var engine = new Engine(config)

  if (config.renderer === undefined) {
    let rendererConfig = Assign({
      emitter: engine.emitter
    }, config.scene)
    engine.renderer = ForwardRenderer(rendererConfig)
  }

  if (config.scene === undefined) {
    let sceneConfig = Assign({
      renderer: engine.renderer,
      emitter: engine.emitter
    }, config.renderer)
    engine.scene = Scene(sceneConfig)
  }

  Boot(engine, config, onReady)

  return engine
}

export default function createEngineRouter (a, b) {
  var properties, onReady

  if (typeof a === 'object') properties = a
  if (typeof b === 'object') properties = b
  if (typeof a === 'function') onReady = a
  if (typeof b === 'function') onReady = b

  return createEngine(properties, onReady)
}
