export default function clearMeshes (cache) {
  for (var key in cache) {
    if (cache.hasOwnProperty(key)) {
      cache[key].meshes = []
    }
  }
}
