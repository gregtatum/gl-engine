export default function flatten( scene, current ) {
	
	if( scene.flags.changed ) {

	} else {
		return current.meshes
	}
	// TODO
	return scene.children
}
