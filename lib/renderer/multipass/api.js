import { PostProcessor } from 'gl-engine'

let renderPass = RenderPass({ camera: camera })
let bloomPass = BloomPass()
let fxaaPass = FXAAPass()

let processor = PostProcessor()
  .use(renderPass, bloomPass, fxaaPass)

//Or

let processor = PostProcessor()
  .use(RenderPass({ scene, camera }))
  .use(FXAAPass())
  .use(BloomPass())
