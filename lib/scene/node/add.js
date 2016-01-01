import UpdateCounts from './update-counts'

export function addChildToNode( scene, edges, parent, child ) {

	if( typeof child !== "object" ) {
		throw new Error("Only objects are allowed in the scene graph")
	}

	var children = scene.children( parent ) 

	// Add the child/parent relationship
	children.push( child )
	edges.parent.set( child, parent )

	// Update scene flags and counts
	UpdateCounts( scene, edges, child, 1 )
	scene.flags.changed = true
	if( child.isLight ) { scene.flags.lightsChanged = true }	
}

export default function add( scene, edges, a, b ) {

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

	addChildToNode( scene, edges, node, child )

	return scene
}
