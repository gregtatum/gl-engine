export function getNodesChildren( graph, node ) {
	var children = graph.children.get( node )
	if( !children ) {
		children = []
		graph.children.set( node, children )
	}
	return children
}

export default function getChildren( scene, graph, a ) {
	
	var node = a ? a : scene
	
	return getNodesChildren( graph, node )
}

