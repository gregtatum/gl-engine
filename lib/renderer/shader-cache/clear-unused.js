export default function clearUnused (cache) {
  for (var key in cache) {
    if (cache[key].meshes.length === 0) {
      delete cache[key]
    }
  }
}
