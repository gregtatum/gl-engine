import RenderScreen from 'a-big-triangle'

function render (multipass, renderScreen) {
  let { passes, scene, resolution, fbos, gl } = multipass

  resolution[0] = scene.renderer.canvas.width
  resolution[1] = scene.renderer.canvas.height
  fbos[0].shape = resolution
  fbos[1].shape = resolution
  let flipflop = 0 // Flip between 0 and 1 with bitwise operations

  let pass, input, output

  for(var i=0; i < passes.length; i++) {
    input = fbos[flipflop]
    output = fbos[flipflop^1]
    flipflop = flipflop^1

    // Decide whether or not to render to screen
    // TODO - this will probably get more complicated
    if(i + 1 < passes.length) {
      output.bind()
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    }

    passes[0].render(input, renderScreen)

  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
}

export default function createRenderFn(multipass) {
  let renderScreen = RenderScreen.bind(null, multipass.gl)
  return render.bind(multipass, renderScreen)
}
