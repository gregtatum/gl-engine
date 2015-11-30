import Transform        from '../../transform'
import Mat4             from 'gl-mat4/create'
import UpdateCamera     from './update'
import UpdateProjection from './update-projection'
import UpdateView       from './update-view'

function PerspectiveCamera( fieldOfView, aspectRatio, clipping ) {
	this.transform        = Transform()
	this.aspectRatio      = aspectRatio === undefined ? 1           : aspectRatio
	this.clipping         = clipping    === undefined ? [0.01, 100] : clipping
	this.fieldOfView      = fieldOfView === undefined ? Math.PI / 4 : fov
	this.projection       = Mat4()
	this.view             = Mat4()
	this.update           = UpdateCamera.bind( null, this, {} )
	this.updateProjection = UpdateProjection.bind( null, this )
	this.updateView       = UpdateView.bind( null, this )
}

export default function perspective( fieldOfView, aspectRatio, clipping ) {
	var camera = new PerspectiveCamera( fieldOfView, aspectRatio, clipping )
	
	return camera
}