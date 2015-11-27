var graph = {
	gl : WebGLContext,
	world : [],
}

var mesh = {
	
	meta : {
		name : "",
		uuid : ""
		children : []
	},
	
	transform : {
		flags : {
			autoUpdate : Boolean,
			autoUpdateEuler : Boolean,
			autoUpdateQuaternion : Boolean,
		},
		position : [0,0,0],
		quaternion : [],
		euler : [],
		scale : [1,1,1],
		local : [],
		global : [],
	}
	
	material : {
		flags : {
			visible : Boolean,
			transparent : Boolean,
		},
		blending : {
			type : ""
			source : gl.ENUM,
			destination : gl.ENUM,
			equation : "Equation"
		}
		colors : {
			diffuse : [],
			specular : [],
			ambient : [],
		},
		shading : {
			specular : [1,0,0]
		},
		locations : [],
	},
	
	geometry : {
		__current : {},
		buffers : [],
		vertices : [],
		cells : [],
	}
}