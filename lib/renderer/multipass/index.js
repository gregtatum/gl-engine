import UsePass from './use-pass'
import CreateRenderFn from './render'
import Destroy from './destroy'
import CreateFBO from 'gl-fbo'
import Debug from './debug'

function MultiPass (renderer) {
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
  this.debug = Debug(this.gl)
  this.canReadDepth = this.gl.getExtension('WEBGL_depth_texture')
}

export default function createMultiPass (forwardRenderer) {
  if(!forwardRenderer) {
    throw new Error('Multipass renderer must be provided a forward renderer.')
  }
  return new MultiPass(forwardRenderer)
}
