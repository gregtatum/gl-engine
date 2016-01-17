export default function getNodesByType (graph, type) {
  var list = graph.types[type]
  if (!list) {
    list = graph.types[type] = []
  }
  return list
}
