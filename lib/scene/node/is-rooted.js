export default function isRooted (scene, graph, node) {
  // Walk up and see if the root node is the scene
  do {
    node = graph.parent.get(node)
  }
  while (node !== scene && node !== undefined)
  return scene === node
}
