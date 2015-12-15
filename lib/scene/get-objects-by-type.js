function fetchByType( meshes, type ) {
	
	var results = []
	
	for( var i=0; i < meshes.length; i++ ) {
		var mesh = meshes[i]
		if( mesh.type === type ) {
			results.push( mesh )
		}
	}
	
	return results
}

export default function getObjectsByType( previous, meshes, changed, type ) {
	
	
	//TODO - DELETE ME?
	
	if( changed ) {
		previous[type] = fetchByType( meshes, type )
	}
	
	return previous[type]
}