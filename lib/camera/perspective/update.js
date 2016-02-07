export default function (camera, canvas) {
  if (camera.flags.autoUpdateViewport) {
    camera.viewport[0] = 0
    camera.viewport[1] = 0
    camera.viewport[2] = canvas.width
    camera.viewport[3] = canvas.height
  }

  if (camera.flags.autoUpdate) {
    camera.updateMatrices()
  }
}
