var {
  MultipassRenderer
  ScenePass
  FXAAPass
  BloomPass
}

var multipass = MultipassRenderer(scene.renderer)
  .use(
    ScenePass({ scene: scene, camera: camera }),
    FXAAPass(),
    BloomPass()
  )

engine.on('update', function (event) {
  multipass.render()
})
