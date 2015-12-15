export default function setUniforms( shader, camera, mesh, lights ) {
	
	for( var i=0; i < lights.length; i++ ) {
		
		shader.uniforms.directionalLights[i].direction = lights[i].direction
		shader.uniforms.directionalLights[i].color = lights[i].color
	}
}