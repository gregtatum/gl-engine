import UpdateLocalTransform from '../../transform/update'

export default function updateMeshTransforms( meshes, scene ) {
	
	for( let i=0; i < meshes.length; i++ ) {
		UpdateLocalTransform( mesh.transform )
	}

	scene.updateTransforms()
}

