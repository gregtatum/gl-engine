export default function setAttributes (geometry, shader) {
  if (!geometry.data.positions) { throw new Error('Geometry did not any positions') }
  if (!geometry.data.normals) { throw new Error('Geometry did not have any normals') }
  if (!geometry.data.cells) { throw new Error('Geometry did not have any faces/cells') }
  geometry.buffers.attr('aNormal', geometry.data.normals)
  geometry.buffers.attr('aPosition', geometry.data.positions)
  geometry.buffers.faces(geometry.data.cells)
}
