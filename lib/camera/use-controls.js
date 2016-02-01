export default function useControls (camera, createControls, settings) {
  var baseUpdate = camera.update
  camera.controls = createControls(camera, settings)

  camera.update = function updateCamera (canvas) {
    if (camera.flags.autoUpdateControls) {
      camera.controls.update()
    }
    baseUpdate(canvas)
  }
  return camera
}
