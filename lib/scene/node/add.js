import UpdateTypes from './update-types'

export function addChildToNode( scene, graph, parent, child ) {

	if( typeof child !== "object" ) {
		throw new Error("Only objects are allowed in the scene graph")
	}

	if( graph.parent.get( child ) ) {
		throw new Error("The node was already added to the scene graph, it must be removed before adding it somewhere else.")
	}
	
	var children = scene.children( parent ) 
	
	// Add the child/parent relationship
	children.push( child )
	graph.parent.set( child, parent )

	// Update scene flags and counts
	UpdateTypes( scene, graph, child, "push" )
	scene.flags.changed = true
}

export default function add( scene, graph, a, b ) {

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

	addChildToNode( scene, graph, node, child )

	return scene
}
