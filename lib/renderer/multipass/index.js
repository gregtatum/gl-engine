import UsePass from './use-pass'
import CreateRenderFn from './render'
import Destroy from './destroy'
import CreateFBO from 'gl-fbo'

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

  this.use = UsePass.bind(null, this)
  this.render = CreateRenderFn(this)
  this.destroy = Destroy.bind(null, this)
}

export default function createMultiPass (forwardRenderer) {
  if(!forwardRenderer) {
    throw new Error('Multipass renderer must be provided a forward renderer.')
  }
  return new MultiPass(forwardRenderer)
}
