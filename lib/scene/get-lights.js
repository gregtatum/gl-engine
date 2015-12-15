function fetchLights( meshes ) {
	
	var results = []
	
	for( var i=0; i < meshes.length; i++ ) {
		var mesh = meshes[i]
		if( mesh.isLight ) {
			results.push( mesh )
		}
	}
	
	return results
}

export default function getObjectsByType( current, meshes, changed ) {
	
	if( changed ) {
		current.lights = fetchLights( meshes )
	}
	
	return current.lights
}