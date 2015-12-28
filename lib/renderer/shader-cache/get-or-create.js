import CreateShader from 'gl-shader'

export default function createShaderOrGetCached( cache, gl, mesh, defines ) {

	let material = mesh.material
	let key = defines + material.vertSource + material.fragSource
	let cachedEntry = cache[key]

	let shader

	if( cachedEntry ) {

		shader = cachedEntry.shader
		
		material.shader.update(
			defines + material.vertSource,
			defines + material.fragSource
		)

		cachedEntry.meshes.push( mesh )

	} else {

		// Create and cache the shader
		shader = CreateShader(
			gl,
			defines + material.vertSource,
			defines + material.fragSource
		)
		
		cache[key] = {
			shader : shader,
			meshes : [ mesh ]
		}
	}

	return shader
}
