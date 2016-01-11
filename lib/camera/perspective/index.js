import CreateCamera from 'perspective-camera'
import CreateMat3   from 'gl-mat3/create'
import CreateMat4   from 'gl-mat4/create'
import UseControls  from './use-controls'
import Update           from './update'
import UpdateNormal     from './update-normal'
import UpdateModelView  from './update-model-view'

function PerspectiveCamera( camera ) {
	
	this.flags = {
		autoUpdate : true,
		autoUpdateViewport : true,
		autoUpdateControls : true
	}
	
	this.update           = Update.bind( null, this )
	this.updateModelView  = UpdateModelView.bind( null, this )
	this.updateNormal     = UpdateNormal.bind( null, this )
	this.updateMatrices   = camera.update
	this.updateControls   = function doNothing() {}
	
	this.identity         = camera.identity
	this.translate        = camera.translate
	this.lookAt           = camera.lookAt
	this.project          = camera.project
	this.unproject        = camera.unproject
	this.createPickingRay = camera.createPickingRay
	this.use              = UseControls.bind( null, this )
	
	this.projection       = camera.projection
	this.view             = camera.view
	this.modelView        = CreateMat4()
	this.normal           = CreateMat3()
	
	this.viewport         = camera.viewport
	this.position         = camera.position
	this.direction        = camera.direction
	this.up               = camera.up
}

export default function perspective( properties ) {
	return new PerspectiveCamera( CreateCamera( properties ) )
}
