export default function removeFromScene( scene, object ) {
	
	var index = scene.children.indexOf( object )
	
	if( index >= 0 ) {
		scene.counts[ object.type ]++
		scene.children.splice( index, 1 )
		scene.flags.changed = true
	}
	
	return scene
}