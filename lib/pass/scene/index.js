function render ({ scene, camera }) {
  scene.render(camera)
}

function initGL (pass, multipass) {
  pass.render = render.bind(null, pass)
  pass.scene = pass.scene || multipass.scene
  pass.camera = pass.camera || multipass.camera
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
