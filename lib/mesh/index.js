import Meta from './meta'
import Transform from '../transform'

function Mesh (geometry, material) {
  this.meta = Meta()
  this.transform = Transform(this)
  this.material = material
  this.geometry = geometry
  this.type = [ 'mesh' ]
}

export default function createMesh (geometry, material) {
  return new Mesh(geometry, material)
}
