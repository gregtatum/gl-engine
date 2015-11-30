export default function removeFromScene( scene, object ) {
	
	var index = scene.children.indexOf( object )
	
	if( index >= 0 ) {
		scene.children.splice( index, 1 )
		scene.current.changed = true
	}
	
	return scene
}