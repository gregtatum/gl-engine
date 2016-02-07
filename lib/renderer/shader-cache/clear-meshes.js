export default function clearMeshes (cache) {
  for (var key in cache) {
    cache[key].meshes = []
  }
}
