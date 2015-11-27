export default function setScenesRenderer( scene, renderer ) {
	
	var render
	
	if( typeof renderer === "object" && typeof renderer.render === "function" ) {
		scene.render = renderer.render.bind( null, scene )
	}
	
	return scene
}