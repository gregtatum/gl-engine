/* 
 * The scene graph is a tree structure, which can be hard to work with at times.
 * This file sets the scene.types to a flattened list of nodes by type. Each node
 * can have multiple types to boil down to. 
 */

import IsRooted from './is-rooted'
const BLANK = []

export function updateTypes( scene, graph, node, addOrRemove ) {
	
	var types = node.type || BLANK
	
	for( var i=0; i < types.length; i++ ) {	
		
		var type = types[i]
		var list = graph.types[ type ]

		if( !graph.types[ type ] ) {
			list = []
			graph.types[ type ] = list 
		}
	
		if( type === "light" ) {
			scene.flags.lightsChanged = true
		}

		if( addOrRemove === "add" ) {
			list.push( node )
		} else {
			var index = list.indexOf( node )
			if( index !== -1 ) {
				list.splice( index, 1 )
			}
		}
	}

	// Recurse
	var children = scene.children( node )
	
	for( var i=0; i < children.length; i++ ) {
		updateTypes( scene, graph, children[i], addOrRemove )
	}
}

export default function updateTypesIfRooted( scene, graph, node, addOrRemove ) {
	
	if( IsRooted( scene, graph, node ) ) {
		updateTypes( scene, graph, node, addOrRemove )
	}
}
