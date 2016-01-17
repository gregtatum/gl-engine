export default function setScenesRenderer (scene, renderer) {
  if (typeof renderer === 'object' && typeof renderer.render === 'function') {
    scene.renderer = renderer
    scene.render = renderer.render.bind(null, scene)
  // renderer.emitter.on('beforerender', scene.emitter.emit.bind(scene.emitter, 'beforerender'))
  }

  return scene
}
