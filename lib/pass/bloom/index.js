import CreateShader from 'gl-shader'

const VERTEX = require('fs').readFileSync(__dirname + '/../vertex/pass-through.glsl', 'utf8')
const FRAGMENT = require('fs').readFileSync(__dirname + '/index.frag', 'utf8')
const KERNEL_STEPS = 4

function initGL (pass, postProcessor, gl) {
  pass.shader = CreateShader(gl, VERTEX, FRAGMENT)

  var pixelRatio = [0,0]

  pass.render = function render (input, renderScreen) {
    pass.shader.bind()

    pass.shader.uniforms.uResolution = postProcessor.resolution
    pass.shader.uniforms.uResolutionRatio = postProcessor.resolution[1] / postProcessor.resolution[0]
    pass.shader.uniforms.uInput = input.color[0].bind(0)
    pass.shader.uniforms.uKernelSize = pass.kernelSize / KERNEL_STEPS / 2
    pass.shader.uniforms.uPower = pass.power
    pass.shader.uniforms.uIntensity = pass.intensity

    renderScreen()
  }
}

function BloomPass (config) {
  this.shader = null
  this.render = null
  this.initGL = initGL.bind(null, this)
  this.intensity = config.intensity
  this.kernelSize = config.kernelSize
  this.power = config.power
}

export default function createBloomPass (props) {
  var config = Object.assign({
    intensity: 0.5,
    kernelSize: 0.05,
    power: 2
  })

  return new BloomPass(config)
}
