import CreateFBO from 'gl-fbo'
import DepthPass from '../../pass/depth'
import RenderScreen from 'a-big-triangle'

function glFboDepth (input, bindLocation) {
  return input.depth.bind(bindLocation)
}

export default function createGetDepth(multipass) {
  /*
   * The multipass renderer can read to the depth from a framebuffer,
   * so use this more efficient functionality.
   */
  if(multipass.canReadDepth) {
    return glFboDepth
  }

  /*
  * Create a color framebuffer that holds depth, and then render
  * the input depth to this FBO. Then bind it to the passed in bind
  * location.
  */
  var fbo = CreateFBO(multipass.gl, multipass.resolution)
  var depthPass = DepthPass()
  depthPass.initGL(multipass)
  var renderScreen = RenderScreen.bind(null, multipass.gl)

  return function renderedDepth(input, bindLocation) {
    debugger
    fbo.shape = input.shape
    fbo.bind()
    depthPass.render(input, renderScreen)
    fbo.color[0].bind(bindLocation)
    return bindLocation
  }
}
