export default function updateOrbitControls (controls) {
  controls.updateController()
  controls.copyInto(
    controls.camera.position,
    controls.camera.direction,
    controls.camera.up
  )
}
