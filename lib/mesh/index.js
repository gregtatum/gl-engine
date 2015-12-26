import Meta from './meta'
import Transform from '../transform'
import Assign from 'object-assign'

function Mesh( geometry, material ) {
	this.meta = Meta()
	this.transform = Transform( this )
	this.material = material
	this.geometry = geometry
}

export default function createMesh( geometry, material ) {
	return new Mesh( geometry, material )
}
