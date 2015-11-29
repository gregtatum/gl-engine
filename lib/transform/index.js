import CreateMat4 from 'gl-mat4/create'

function Transform() {
	this.flags = {
		autoUpdate : true,
		useEuler : true,
	},
	this.position   = [0,0,0]
	this.quaternion = [0,0,0,1]
	this.euler      = [0,0,0]
	this.eulerOrder = ['x','y','z']
	this.scale      = [1,1,1]
	this.local      = CreateMat4()
	this.global     = CreateMat4()
}

export default function createTransform() {
	return new Transform()
}