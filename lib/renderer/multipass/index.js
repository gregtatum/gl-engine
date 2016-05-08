import UsePass from './use-pass'
import CreateRenderFn from './render'
import Destroy from './destroy'
import CreateFBO from 'gl-fbo'
import Debug from './debug'
import GetDepth from './get-depth'

function MultiPass (renderer, createDebugger) {
  this.renderer = renderer
  this.gl = renderer.gl
  this.passes = []
  this.resolution = [
    renderer.canvas.width,
    renderer.canvas.height
  ]
  this.fbos = [
    CreateFBO(renderer.gl, this.resolution),
    CreateFBO(renderer.gl, this.resolution)
  ]

  this.fbos[0].name = 'fbo_0'
  this.fbos[1].name = 'fbo_1'

  this.use = UsePass.bind(null, this)
  this.render = CreateRenderFn(this)
  this.destroy = Destroy.bind(null, this)
  this.debug = createDebugger ? createDebugger(this.gl) : null
  this.canReadDepth = this.gl.getExtension('WEBGL_depth_texture')
  // this.canReadDepth = false
  this.getDepth = GetDepth(this)
}

export default function createMultiPass (forwardRenderer, createDebugger) {
  if(!forwardRenderer) {
    throw new Error('Multipass renderer must be provided a forward renderer.')
  }
  return new MultiPass(forwardRenderer, createDebugger)
}
