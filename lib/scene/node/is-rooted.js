export default function isRooted( scene, edges, node ) {

	// Walk up and see if the root node is the scene
	do {
		node = edges.parent.get( node )
	}
	while( node !== scene && node !== undefined )
	
	return scene === node
}
