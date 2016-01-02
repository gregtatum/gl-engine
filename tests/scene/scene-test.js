import Test from 'tape'
import {
	Scene,
} from '../../lib'

Test("Scene", function(t) {
	
	t.test("An item can be added and removed from the root", function(t) {
		
		t.plan(11)

		var scene = Scene()

		var nodeA = {}
		var nodeB = {}

		scene.add( nodeA )
		scene.add( nodeB )
		
		var children = scene.children()

		t.equals( children.length, 2, "The scene should have two things in it" )
		t.equals( children[0], nodeA, "The first should be node a" )
		t.equals( children[1], nodeB, "The second should be node b" )
		t.equals( scene.parent( nodeA ), scene, "node a's parent is scene" )
		t.equals( scene.parent( nodeB ), scene, "node b's parent is scene" )

		scene.remove( nodeA )

		t.equals( children.length, 1, "The scene should still have one thing on it." )
		t.equals( children[0], nodeB, "It should be node b" )
		t.equals( children, scene.children(), "A second scene.children should be the same list" )
		t.equals( scene.parent( nodeA ), undefined, "node a's parent is undefined" )
		t.equals( scene.parent( nodeB ), scene, "node b's parent is left alone" )

		scene.remove( nodeB )

		t.equals( children.length, 0, "The scene should be empty after removing all the nodes" )
	})

	t.test("Items can be made children", function(t) {
		
		t.plan(11)
		
		var scene = Scene()

		var root = {}
		var nodeA = {}
		var nodeB = {}

		scene.add( root, nodeA )
		scene.add( root, nodeB )
		
		var children = scene.children( root )

		t.equals( children.length, 2, "The root should have two things in it" )
		t.equals( children[0], nodeA, "The first should be node a" )
		t.equals( children[1], nodeB, "The second should be node b" )
		t.equals( scene.parent( nodeA ), root, "node a's parent is root" )
		t.equals( scene.parent( nodeB ), root, "node b's parent is root" )

		scene.remove( root, nodeA )

		t.equals( children.length, 1, "The root should still have one thing on it." )
		t.equals( children[0], nodeB, "It should be node b" )
		t.equals( children, scene.children( root ), "A second scene.children should be the same list" )
		t.equals( scene.parent( nodeA ), undefined, "node a's parent is undefined" )
		t.equals( scene.parent( nodeB ), root, "node b's parent is still the same" )

		scene.remove( root, nodeB )

		t.equals( children.length, 0, "The scene should be empty" )
	})

	t.test("Updates counts of the nodes in the graph", function(t) {
	
		var scene = Scene()

		var root = { type: 'root' }
		var nodeA = { type: 'subnode' }
		var nodeB = { type: 'subnode' }
		var nodeC = { type: 'subnode' }
		var nodeD = { type: 'subnode' }

		scene.add( root, nodeA )
		scene.add( root, nodeB )
		
		t.equals( scene.counts.root, undefined, "The root isn't counted when nothing is in the scene" )
		t.equals( scene.counts.subnode, undefined, "The subnode isn't counted when nothing is in the scene" )
		
		scene.add( root )

		t.equals( scene.counts.root, 1, "The root is counted" )
		t.equals( scene.counts.subnode, 2, "The subnodes are counted" )
		
		scene.add( root, nodeC )

		t.equals( scene.counts.subnode, 3, "Adding a single node in the graph is counted" )

		scene.add( nodeD )

		t.equals( scene.counts.subnode, 4, "Adding to the root counts" )

		scene.remove( root )

		t.equals( scene.counts.subnode, 1, "Removing nodes are updated" )
		
	})

})
