import UpdateCounts from './update-counts'

export function nodeRemoveChild( scene, edges, parent, child ) {
	
	var siblings = scene.children( parent )
	var index = siblings.indexOf( child )

	if( index >= 0 ) {
		
		// Remove the links on the graph
		siblings.splice(index, 1)
		edges.parent.delete( child )
		
		// Update flags
		UpdateCounts( scene, edges, child, -1 )
		scene.flags.changed = true
	}
}

export default function remove( scene, edges, a, b ) {

	var node, child
	
	if( a && b ) {
		node = a
		child = b
	} else if ( a && !b ) {
		node = scene
		child = a
	} else {
		throw new Error('Tried to add nothing to the scene.')
	}

	nodeRemoveChild( scene, edges, node, child )

	return scene
}
