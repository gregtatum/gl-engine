import ClearMeshes from './clear-meshes'
import ClearUnused from './clear-unused'
import GetOrCreate from './get-or-create'

export default function shaderCache () {
  var cache = Object.create(null)

  return {
    clearMeshes: ClearMeshes.bind(null, cache),
    clearUnused: ClearUnused.bind(null, cache),
    getOrCreate: GetOrCreate.bind(null, cache)
  }
}
