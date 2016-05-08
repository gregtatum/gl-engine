import RenderScreen from 'a-big-triangle'
const COLOR_DEPTH_BITS = 16640

function render (multipass, renderScreen) {
  var { passes, renderer, resolution, fbos, gl, debug } = multipass

  if (resolution[0] !== renderer.canvas.width || resolution[1] !== renderer.canvas.height) {
    resolution[0] = renderer.canvas.width
    resolution[1] = renderer.canvas.height

    fbos[0].shape = resolution
    fbos[1].shape = resolution
  }
  var flipflop = 0 // Flip between 0 and 1 with bitwise operations

  var pass, input, output

  for(var i=0; i < passes.length; i++) {
    input = fbos[flipflop]
    output = fbos[flipflop = flipflop^1]

    var outputToScreen = (i + 1 === passes.length)

    // Decide whether or not to render to screen
    // TODO - this will probably get more complicated
    if(outputToScreen && !debug) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    } else {
      output.bind()
      gl.clear(COLOR_DEPTH_BITS)
    }

    passes[i].render(input, renderScreen)

    if(debug) {
      debug.drawPass(i, passes.length, output)
    }
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  if (debug) {
    debug.drawToScreen(output)
  }
}

export default function createRenderFn(multipass) {
  var renderScreen = RenderScreen.bind(null, multipass.gl)
  return render.bind(null, multipass, renderScreen)
}
