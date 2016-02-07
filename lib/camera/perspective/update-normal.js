import NormalFromMat4 from 'gl-mat3/normal-from-mat4'

export default function updateNormal (camera) {
  NormalFromMat4(
    camera.normal,
    camera.modelView
  )
}
