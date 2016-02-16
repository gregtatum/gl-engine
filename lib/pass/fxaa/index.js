import CreateShader from 'gl-shader'

const VERTEX = require('fs').readFileSync(__dirname + '/../vertex/pass-through.glsl', 'utf8')
const FRAGMENT = require('fs').readFileSync(__dirname + '/built.frag', 'utf8')

function render (pass, postProcessor, input, renderScreen) {
  let { resolution } = postProcessor
  let { shader } = pass

  shader.bind()
  shader.uniforms.uResolution = resolution
  shader.uniforms.uInput = input.color[0].bind(0)

  renderScreen()
}

function initGL (pass, postProcessor, gl) {
  pass.shader = CreateShader(gl, VERTEX, FRAGMENT)
  pass.render = render.bind(null, pass, postProcessor)
}

function FXAAPass () {
  this.initGL = initGL.bind(null, this)
  this.shader = null
  this.render = null
}

export default function createFXAASettings () {
  return new FXAAPass()
}
