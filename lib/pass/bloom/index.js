import CreateShader from 'gl-shader'

const VERTEX = require('fs').readFileSync(__dirname + '/../utils/pass-through.glsl', 'utf8')
const FRAGMENT = require('fs').readFileSync(__dirname + '/index.frag', 'utf8')
const KERNEL_STEPS = 4

function initGL (pass, multipass, gl) {
  pass.shader = CreateShader(gl, VERTEX, FRAGMENT)

  var pixelRatio = [0,0]

  pass.render = function render (input, renderScreen) {
    pass.shader.bind()

    pass.shader.uniforms.uResolution = multipass.resolution
    pass.shader.uniforms.uResolutionRatio = multipass.resolution[1] / multipass.resolution[0]
    pass.shader.uniforms.uInput = input.color[0].bind(0)
    pass.shader.uniforms.uKernelSize = pass.kernelSize / KERNEL_STEPS / 2
    pass.shader.uniforms.uPower = Math.log(pass.power)
    pass.shader.uniforms.uIntensity = pass.intensity

    renderScreen()
  }
}

function addGui (pass, gui) {
  var folder = gui.addFolder('Bloom')
  gui.add(pass, 'kernelSize', 0, 0.5).step(0.001);
  gui.add(pass, 'intensity', 0, 1).step(0.001);
  gui.add(pass, 'power', 0.0001, 10).step(0.001);

  return folder
}

function BloomPass (config) {
  this.shader = null
  this.render = null

  this.intensity = config.intensity
  this.kernelSize = config.kernelSize
  this.power = config.power

  this.initGL = initGL.bind(null, this)
  this.addGui = addGui.bind(null, this)
  this.gui = config.gui ? addGui(this, config.gui) : null
}

export default function createBloomPass (props) {
  var config = Object.assign({
    intensity: 0.5,
    kernelSize: 0.05,
    power: 2
  }, props)

  return new BloomPass(config)
}
