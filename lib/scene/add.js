export default function addToScene( scene, object ) {
	
	scene.children.push( object )
	scene.current.changed = true
	return scene
}