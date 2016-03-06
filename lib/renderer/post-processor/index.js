import UsePass from './use-pass'
import Render from './render'
import Destroy from './destroy'
import CreateFBO from 'gl-fbo'

function PostProcessor (scene, camera) {
  this.scene = scene
  this.camera = camera
  this.passes = []
  this.gl = scene.renderer.gl
  this.resolution = [
    scene.renderer.canvas.width,
    scene.renderer.canvas.height
  ]
  this.fbos = [
    CreateFBO(gl, resolution),
    CreateFBO(gl, resolution)
  ]

  this.use = UsePass.bind(null, this)
  this.render = Render.bind(null, this)
  this.destroy = Destroy.bind(null, this)
}

export default function createPostProcessor (scene, camera) {
  if(!scene || !scene.renderer) {
    throw new Error('Post processor must be provided a scene with an attached renderer.')
  }
  return new PostProcessor(scene, camera)
}
