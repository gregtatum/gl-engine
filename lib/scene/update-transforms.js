/*
 * Generate the global transforms of all the nodes in the graph. This works
 * recursively. Nodes don't necessarily have transforms, so these will pass
 * through the parent matrix, or use an identity matrix for top level nodes.
 *
 * Nodes don't have to auto-update, and will be skipped over.
 */

import {
	multiply as Multiply,
	identity as Identity,
	copy     as Copy
} from 'gl-mat4'

var IDENTITY = Identity(Array(16))

export function walkAndUpdateTransforms( graph, children, parentMatrix ) {
	
	for( var i=0; i < children.length; i++ ) {	
		
		var nextMatrix = parentMatrix
		var node = children[i]
		
		if( typeof node.transform === "object" ) {

			if( node.transform.autoUpdate ) {
		
				var localMatrix = node.transform.local
				var globalMatrix = node.transform.global

				Multiply( globalMatrix, localMatrix, globalMatrix )
				nextMatrix = globalMatrix

			} else {

				nextMatrix = node.transform.global
			}
		}

		walkAndUpdateTransforms( graph, graph.children.get( node ), nextMatrix )
	}
}

export default function updateGlobalTransforms( scene, graph ) {

	var children = graph.children.get( scene )

	// Start recursing through all the first level items in the scene
	// Provide an identity matrix as the base if no transform exists
	// Copy over the local transform to global
	
	for( var i=0; i < children.length; i++ ) {

		var node = children[i]
		var nextMatrix = IDENTITY

		if( typeof node.transform === "object" ) {
			
			if( node.transform.flags.autoUpdate ) {
				Copy( node.transform.global, node.transform.local )
			}
			
			nextMatrix = node.transform.global
		}

		walkAndUpdateTransforms( graph, graph.children( node ), matrix ) 
	}
}

