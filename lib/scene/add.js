export default function addToScene( scene, object ) {
	scene.counts[ object.type ] = (scene.counts[ object.type ] || 0) + 1
	scene.children.push( object )
	scene.flags.changed = true
	return scene
}