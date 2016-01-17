export default function setAttributes (geometry, shader) {
  geometry.buffers.attr('aPosition', geometry.data.positions)
  geometry.buffers.faces(geometry.data.cells)
}
