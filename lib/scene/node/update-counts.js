import IsRooted from './is-rooted'

export function updateCounts( scene, edges, node, amount ) {
	
	// Do the work
	if( node.type ) {
		var existingValue = (scene.counts[ object.type ] || 0)
		scene.counts[ node.type ] = existingValue + amount
	}

	// Recurse
	var children = scene.children( node )
	
	for( var i=0; i < children.length; i++ ) {
		updateCounts( scene, edges, children[i], amount )
	}
}

export default function updateCountsIfRooted( scene, edges, node, amount ) {
	
	if( IsRooted( scene, edges, node ) ) {
		updateCounts( scene, edges, node, amount )
	}
}
