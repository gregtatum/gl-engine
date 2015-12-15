import Normalize from 'gl-vec3/normalize'
import Copy from 'gl-vec3/copy'
import UpdateScalessTransform from '../../transform/update-scaleless'

export default function updateLight( light, previous, shader ) {
	
	// TODO - Re-evaluate this approach
	
	if(
		light.flags.autoNormalizeTransform && (
			previous.direction[0] !== light.direction[0] ||
			previous.direction[1] !== light.direction[1] ||
			previous.direction[2] !== light.direction[2]
		)
	) {
		Normalize( light.direction, light.direction )
		Copy( previous.direction, light.direction )
	}
	
	UpdateScalessTransform( light.transform )
}