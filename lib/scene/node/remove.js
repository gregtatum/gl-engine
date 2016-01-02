import UpdateTypes from './update-types'

export function nodeRemoveChild( scene, graph, parent, child ) {
	
	var siblings = scene.children( parent )
	var index = siblings.indexOf( child )

	if( index >= 0 ) {
		
		// Update types before removing the nodes
		UpdateTypes( scene, graph, child, "pop" )
		scene.flags.changed = true
		
		// Remove the links on the graph
		siblings.splice(index, 1)
		graph.parent.delete( child )	
	}
}

export default function remove( scene, graph, a, b ) {

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

	nodeRemoveChild( scene, graph, node, child )

	return scene
}
