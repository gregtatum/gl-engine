export default function start (engine) {
  engine.emitter.emit('ready', engine, engine.scene, engine.renderer)
}
