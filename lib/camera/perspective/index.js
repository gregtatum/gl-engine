import CreateCamera from 'perspective-camera'
import CreateMat3 from 'gl-mat3/create'
import CreateMat4 from 'gl-mat4/create'
import UseControls from '../use-controls'
import Update from './update'
import UpdateNormal from './update-normal'
import UpdateModelView from './update-model-view'

function PerspectiveCamera (camera) {
  camera.flags = {
    autoUpdate: true,
    autoUpdateViewport: true,
    autoUpdateControls: true
  }

  camera.modelView = CreateMat4()
  camera.normal = CreateMat3()

  camera.updateMatrices = camera.update
  camera.updateModelView = UpdateModelView.bind(null, camera)
  camera.updateNormal = UpdateNormal.bind(null, camera)
  camera.update = Update.bind(null, camera)
  camera.use = UseControls.bind(null, camera)

  return camera
}

export default function perspective (properties) {
  return PerspectiveCamera(CreateCamera(properties))
}
