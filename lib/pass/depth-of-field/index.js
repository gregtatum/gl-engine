import CreateShader from 'gl-shader'

const VERTEX = require('fs').readFileSync(__dirname + '/../vertex/pass-through.glsl', 'utf8')
const FRAGMENT = require('fs').readFileSync(__dirname + '/index.frag', 'utf8')
const KERNEL_STEPS = 4

function initGL (pass, postProcessor, gl) {
  pass.shader = CreateShader(gl, VERTEX, FRAGMENT)

  var pixelRatio = [0,0]

  pass.render = function render (input, renderScreen) {
    pass.shader.bind()

    var uniforms = pass.shader.uniforms

    uniforms.uInput = input.color[0].bind(0)
    uniforms.uDepthTexture = input.depth.bind(1)

    uniforms.uResolution = postProcessor.resolution
    uniforms.uResolutionRatio = postProcessor.resolution[1] / postProcessor.resolution[0]
    uniforms.uKernelSize = pass.kernelSize / KERNEL_STEPS / 2
    uniforms.uFocus = 1 - pass.focus
    uniforms.uDepth = 1 / (pass.depth * 2)

    renderScreen()
  }
}

function addGui (pass, gui) {
  var folder = gui.addFolder('Depth of Field');
  folder.add(pass, 'kernelSize', 0, 0.5).step(0.001)
  folder.add(pass, 'focus', 0, 1).step(0.001)
  folder.add(pass, 'depth', 0, 1).step(0.001)
  return folder
}

function DepthOfFieldPass (config) {
  this.shader = null
  this.render = null

  this.kernelSize = config.kernelSize
  this.focus = config.focus
  this.depth = config.depth

  this.initGL = initGL.bind(null, this)
  this.addGui = addGui.bind(null, this)
  this.gui = config.gui ? addGui(this, config.gui) : null
}

export default function createDepthOfFieldPass (props) {
  var config = Object.assign({
    kernelSize: 0.05,
    focus: 0.5,
    depth: 1
  }, props)

  return new DepthOfFieldPass(config)
}
