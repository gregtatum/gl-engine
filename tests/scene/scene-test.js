import Test from 'tape'
import { identity } from 'gl-mat4'
import { Scene, Mesh } from '../../lib'

Test('Scene', function (t) {
  t.test('A node can be added and removed from the scene node', function (t) {
    t.plan(11)

    var scene = Scene()

    var nodeA = {}
    var nodeB = {}

    scene.add(nodeA)
    scene.add(nodeB)

    var children = scene.children()

    t.equals(children.length, 2, 'The scene should have two things in it')
    t.equals(children[0], nodeA, 'The first should be node a')
    t.equals(children[1], nodeB, 'The second should be node b')
    t.equals(scene.parent(nodeA), scene, "node a's parent is scene")
    t.equals(scene.parent(nodeB), scene, "node b's parent is scene")

    scene.remove(nodeA)

    t.equals(children.length, 1, 'The scene should still have one thing on it.')
    t.equals(children[0], nodeB, 'It should be node b')
    t.equals(children, scene.children(), 'A second scene.children should be the same list')
    t.equals(scene.parent(nodeA), undefined, "node a's parent is undefined")
    t.equals(scene.parent(nodeB), scene, "node b's parent is left alone")

    scene.remove(nodeB)

    t.equals(children.length, 0, 'The scene should be empty after removing all the nodes')
  })

  t.test('Nodes can be made children', function (t) {
    t.plan(11)

    var scene = Scene()

    var root = {}
    var nodeA = {}
    var nodeB = {}

    scene.add(root, nodeA)
    scene.add(root, nodeB)

    var children = scene.children(root)

    t.equals(children.length, 2, 'The root should have two things in it')
    t.equals(children[0], nodeA, 'The first should be node a')
    t.equals(children[1], nodeB, 'The second should be node b')
    t.equals(scene.parent(nodeA), root, "node a's parent is root")
    t.equals(scene.parent(nodeB), root, "node b's parent is root")

    scene.remove(root, nodeA)

    t.equals(children.length, 1, 'The root should still have one thing on it.')
    t.equals(children[0], nodeB, 'It should be node b')
    t.equals(children, scene.children(root), 'A second scene.children should be the same list')
    t.equals(scene.parent(nodeA), undefined, "node a's parent is undefined")
    t.equals(scene.parent(nodeB), root, "node b's parent is still the same")

    scene.remove(root, nodeB)

    t.equals(children.length, 0, 'The scene should be empty')
  })

  t.test('Update the sorted types in the graph', function (t) {
    t.plan(10)
    var scene = Scene()

    var root = { type: ['root'] }
    var nodeA = { type: ['subnode', 'nodeA'] }
    var nodeB = { type: ['subnode', 'nodeB'] }
    var nodeC = { type: ['subnode', 'nodeC'] }
    var nodeD = { type: ['subnode', 'nodeD'] }

    scene.add(root, nodeA)
    scene.add(root, nodeB)

    t.isEquivalent(scene.getByType('root'), [], "The root isn't counted when nothing is in the scene")
    t.isEquivalent(scene.getByType('subnode'), [], "The subnode isn't counted when nothing is in the scene")

    scene.add(root)

    t.isEquivalent(scene.getByType('root'), [ root ], 'The root shows up when added to the scene')
    t.isEquivalent(scene.getByType('subnode'), [ nodeA, nodeB ], 'The subnodes show up when the root is added to the scene')

    scene.add(root, nodeC)

    t.isEquivalent(scene.getByType('subnode'), [ nodeA, nodeB, nodeC ], 'Adding a single node in works')

    scene.add(nodeD)

    t.isEquivalent(scene.getByType('subnode'), [ nodeA, nodeB, nodeC, nodeD ], 'Adding a single node to the root works')
    t.isEquivalent(scene.getByType('nodeD'), [ nodeD ], 'Nodes can have multiple types')

    scene.remove(root)

    t.isEquivalent(scene.getByType('root'), [], 'Removing a node works')
    t.isEquivalent(scene.getByType('subnode'), [ nodeD ], 'Removing the parent removes the children ')
    t.isEquivalent(scene.getByType('nodeD'), [ nodeD ], 'Detached node is still there')
  })

  t.test('Update the global matrices of nodes', function (t) {
    t.plan(12)

    // TODO
    var scene = Scene()
    var parent = Mesh()
    var child = Mesh()

    var identityMatrix = identity([])
    var childLocalMatrix = identity([])
    var childGlobalMatrix = identity([])
    var parentMovedMatrix = identity([])

    scene.add(parent)
    scene.add(parent, child)
    scene.updateTransforms()

    t.isEquivalent(parent.transform.local, identityMatrix, 'parent local transform is clean to start')
    t.isEquivalent(parent.transform.global, identityMatrix, 'parent global transform is clean to start')

    t.isEquivalent(child.transform.local, identityMatrix, 'child local transform is clean to start')
    t.isEquivalent(child.transform.global, identityMatrix, 'child global transform is clean to start')

    parentMovedMatrix[13] = 7
    parent.position[1] = 7
    scene.updateTransforms()

    t.isEquivalent(parent.transform.local, parentMovedMatrix, 'parent local transform is moved')
    t.isEquivalent(parent.transform.global, parentMovedMatrix, 'parent global transform is moved')

    t.isEquivalent(child.transform.local, identityMatrix, 'child local transform is clean')
    t.isEquivalent(child.transform.global, parentMovedMatrix, 'child global transform matches the parent')

    childLocalMatrix[13] = 5
    childGlobalMatrix[13] = 12
    child.position[1] = 5
    scene.updateTransforms()

    t.isEquivalent(parent.transform.local, parentMovedMatrix, 'parent local transform is still moved')
    t.isEquivalent(parent.transform.global, parentMovedMatrix, 'parent global transform is still moved')

    t.isEquivalent(child.transform.local, childLocalMatrix, 'child local transform is custom')
    t.isEquivalent(child.transform.global, childGlobalMatrix, 'child global transform is the combination of the two matrices')
  })
})
