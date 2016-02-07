function Geometry (simplicialComplex) {
  this.flags = {
    updateBuffers: true
  }

  this.buffers = null // gl-geometry

  this.data = {
    positions: simplicialComplex.positions,
    cells: simplicialComplex.cells,
    normals: simplicialComplex.normals
  }
}

export default function geometry (simplicialComplex) {
  return new Geometry(simplicialComplex || {})
}
