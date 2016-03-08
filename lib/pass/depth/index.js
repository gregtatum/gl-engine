import CreateShader from 'gl-shader'

const VERTEX = require('fs').readFileSync(__dirname + '/../vertex/pass-through.glsl', 'utf8')
const FRAGMENT = require('fs').readFileSync(__dirname + '/index.frag', 'utf8')

function initGL (pass, postProcessor, gl) {
  pass.shader = CreateShader(gl, VERTEX, FRAGMENT)

  var pixelRatio = [0,0]

  pass.render = function render (input, renderScreen) {
    pass.shader.bind()
    pass.shader.uniforms.uDepth = input.depth.bind(0)
    renderScreen()
  }
}

function DepthPass (config) {
  this.shader = null
  this.render = null
  this.initGL = initGL.bind(null, this)
}

export default function createDepthPass (props) {
  var config = Object.assign({
  })

  return new DepthPass(config)
}
