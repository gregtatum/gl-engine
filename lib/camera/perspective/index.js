import Transform        from '../../transform'
import Mat4             from 'gl-mat4/create'
import UpdateCamera     from './update'
import UpdateProjection from './update-projection'
import UpdateView       from './update-view'

function GlamPerspectiveLookAt( camera ) {
	// TODO - Probably refactor this out, not implemented yet
	this.camera   = camera
	this.target   = null
	this.upVector = null
}

function GlamPerspectiveCamera( fov, aspectRatio, clipping ) {
	this.transform        = Transform()
	this.aspectRatio      = aspectRatio === undefined ? 1           : aspectRatio
	this.clipping         = clipping    === undefined ? [0.01, 100] : clipping
	this.fieldOfView      = fov         === undefined ? Math.PI / 4 : fov
	this.lookAt           = new GlamPerspectiveLookAt( this )
	this.transform        = Transform()
	this.projection       = Mat4()
	this.view             = Mat4()
	this.update           = UpdateCamera.bind( null, this, {} )
	this.updateProjection = UpdateProjection.bind( null, this )
	this.updateView       = UpdateView.bind( null, this )
}

export default function createPerspectiveCamera( fov, aspectRatio, clipping ) {
	var camera = new GlamPerspectiveCamera( fov, aspectRatio, clipping )
	
	return camera
}