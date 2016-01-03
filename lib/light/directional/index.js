import Meta      from '../../mesh/meta'
import Transform from '../../transform'
import Update    from './update'
import Assign    from 'object-assign'

function DirectionalLight( config ) {
	
	this.meta = Meta()
	this.transform = Transform( this )
	this.type = ["light", "light/directional"]

	this.flags = {
		autoNormalizeDirection : true
	}
	
	this.direction = config.direction
	this.color = config.color
	
	this.update = Update.bind( null, this, {
		direction : Array(3)
	})
}

export default function createDirectionalLight( properties ) {
	
	var config = Assign({
		direction : [0,1,0],
		color : [1,1,1]
	}, properties)
	
	return new DirectionalLight( config )
}
