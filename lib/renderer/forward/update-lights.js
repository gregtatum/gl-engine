export default function updateLights (lights) {
  for (var i = 0; i < lights.length; i++) {
    lights[i].update()
  }
}
