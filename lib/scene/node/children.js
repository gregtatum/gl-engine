export function getNodesChildren( edges, node ) {
	var children = edges.children.get( node )
	if( !children ) {
		children = []
		edges.children.set( node, children )
	}
	return children
}

export default function getChildren( scene, edges, a ) {
	
	var node = a ? a : scene
	
	return getNodesChildren( edges, node )
}

