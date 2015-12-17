import Meta from './meta'
import Transform from '../transform'
import Assign from 'object-assign'

function Mesh( material, geometry ) {
	this.meta = Meta()
	this.transform = Transform( this )
	this.material = material
	this.geometry = geometry
}

export default function createMesh( material, geometry ) {
	return new Mesh( material, geometry )
}