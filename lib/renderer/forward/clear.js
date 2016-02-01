export default function clear (gl, config) {
  var clearBits = 0

  if (config.colorBuffer) {
    gl.clearColor(
      config.color[0],
      config.color[1],
      config.color[2],
      config.color[3]
    )
    clearBits |= gl.COLOR_BUFFER_BIT
  }
  if (config.depthBuffer) clearBits |= gl.DEPTH_BUFFER_BIT
  if (config.stencilBuffer) clearBits |= gl.STENCIL_BUFFER_BIT

  if (clearBits) {
    gl.clear(clearBits)
  }
}
