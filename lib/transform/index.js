import CreateMat4 from 'gl-mat4/create'

function Transform() {
	this.flags = {
		autoUpdate : true,
		useEuler : true,
	},
	this.position       = [0,0,0]
	this.globalPosition = [0,0,0]
	this.scale          = [1,1,1]
	this.quaternion     = [0,0,0,1]
	this.euler          = [0,0,0]
	this.eulerOrder     = ['x','y','z']
	this.local          = CreateMat4()
	this.global         = CreateMat4()
}

export default function createTransform( decoratee ) {
	
	var transform = new Transform()
	
	if( decoratee ) {
		decoratee.position   = transform.position
		decoratee.quaternion = transform.quaternion
		decoratee.euler      = transform.euler
		decoratee.scale      = transform.scale
	}
	
	return transform
}
