var Glam       = require('../../lib')
var Box        = require('geo-3d-box')
var Animator   = require('keyframe-animator')

// TODO - This is mainly for testing multiple meshes, it's not complete
// nor necessarily relevant in the end.

Glam.Engine(function( engine, scene ) {

	var camera = Glam.PerspectiveCamera()
	var geometry = Glam.Geometry( Box({size: 0.5}) )
	var meshes = createMeshes( scene, geometry, 100 )
	
	camera.transform.position[2] = 20
	
	engine.on('update', function( e ) {
		
		updateMeshes( e.elapsed, meshes )
		scene.render( camera )
	})
})

function createMeshes( scene, geometry, count ) {
	
	var meshes = []
	var material = Glam.FlatMaterial({
			color : [0.1, 0.3, 0.4]
		})
		.use( Glam.FogAugment, {
			color : [1,1,1],
			near : 10,
			far: 30
		})

	for( var i=0; i < count; i++ ) {
		
		var mesh = Glam.Mesh( geometry, material )
		scene.add( mesh )
		meshes.push( mesh )
		mesh.transform.euler[1] = Math.PI * Math.random()	
	}
	
	return meshes
}

function updateMeshes( elapsed, meshes ) {
	
	meshes.forEach(function( mesh, i ) {
		
		var unitI = i / meshes.length
		var unitTau = Math.PI * 2 * unitI
		var position = mesh.transform.position
		
		position[0] = Math.cos( elapsed * 0.001 + unitTau ) * 5
		position[1] = Math.sin( elapsed * 0.001 + unitTau ) * 5
		position[2] = Math.sin( elapsed * 0.001 + unitTau * 3 ) * 5
		
	})
}
