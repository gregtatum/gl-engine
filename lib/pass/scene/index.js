function render ({ scene, camera }) {
  scene.render(camera)
}

function initGL (pass, postProcessor) {
  pass.render = render.bind(null, pass)
  pass.scene = pass.scene || postProcessor.scene
  pass.camera = pass.camera || postProcessor.camera
}

function ScenePass (config) {
  this.initGL = initGL.bind(null, this)
  this.scene = config.scene
  this.camera = config.camera
  this.render = null
}

export default function createSceneSettings (props) {
  return new ScenePass(props || {})
}
