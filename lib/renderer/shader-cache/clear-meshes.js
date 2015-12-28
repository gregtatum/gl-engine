export default function clearMeshes( cache ) {

	for( key in cache ) {
		if( cache.hasOwnProperty( key ) ) {
			cache[key].meshes = []
		}
	}
}
