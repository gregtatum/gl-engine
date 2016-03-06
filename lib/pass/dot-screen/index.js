import CreateShader from 'gl-shader'

const VERTEX = require('fs').readFileSync(__dirname + '/../vertex/pass-through.glsl', 'utf8')
const FRAGMENT = require('fs').readFileSync(__dirname + '/built.frag', 'utf8')

function initGL (pass, postProcessor, gl) {
  pass.shader = CreateShader(gl, VERTEX, FRAGMENT)

  pass.render = function render (input, renderScreen) {
    pass.shader.bind()
    pass.shader.uniforms.uResolution = postProcessor.resolution
    pass.shader.uniforms.uInput = input.color[0].bind(0)

    renderScreen()
  }
}

function DotScreenPass () {
  this.initGL = initGL.bind(null, this)
  this.shader = null
  this.render = null
}

export default function createDotScreenSettings () {
  return new DotScreenPass()
}
