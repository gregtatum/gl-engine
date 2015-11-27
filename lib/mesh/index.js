import Meta from './meta'
import Transform from '../transform'

function GlamMesh( material, geometry ) {
	this.meta = Meta()
	this.transform = Transform()
	this.material = material
	this.geometry = geometry
}

export default function createMesh( material, geometry ) {
	return new GlamMesh( material, geometry )
}