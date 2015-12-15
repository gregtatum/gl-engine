import CreateMat4          from 'gl-mat4/create'
import RotationTranslation from 'gl-mat4/fromRotationTranslation'
import Multiply            from 'gl-mat4/multiply'
import Identity            from 'gl-mat4/identity'
import Copy                from 'gl-mat4/copy'
import UpdateEuler         from './update-euler'

var rotationTranslation = CreateMat4()

export default function updateTransform( transform ) {
	
	if( transform.flags.autoUpdate ) {
		
		UpdateEuler         ( transform )
		RotationTranslation ( rotationTranslation, transform.quaternion, transform.position )
		
		// TODO - Pull this out somewhere else to allow nested objects
		Copy                ( transform.global, transform.local )
	}
}