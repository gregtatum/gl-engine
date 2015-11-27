import Transform        from '../../transform'
import Mat4             from 'gl-mat4/create'
import UpdateProjection from './update-projection'
import UpdateView       from './update-view'

function GlamPerspectiveLookAt( camera ) {
	// TODO - Probably refactor this out, not implemented yet
	this.camera   = camera
	this.target   = null
	this.upVector = null
}

function GlamPerspectiveCamera() {
	this.transform        = Transform()
	this.fieldOfView      = Math.PI / 4
	this.clipping         = [0.01, 100]
	this.lookAt           = new GlamPerspectiveLookAt( this )
	this.transform        = Transform()
	this.aspectRatio      = 1
	this.projection       = Mat4()
	this.view             = Mat4()
	this.updateProjection = UpdateProjection.bind( null, this )
	this.updateView       = UpdateView.bind( null, this )
}

export default function createPerspectiveCamera( fov, aspectRatio, clipping ) {
	var camera = new GlamPerspectiveCamera( fov, aspectRatio, clipping )
	
	UpdateProjection( camera )
	return camera
}