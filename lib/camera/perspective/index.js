import Transform        from '../../transform'
import CreateMat3       from 'gl-mat3/create'
import CreateMat4       from 'gl-mat4/create'
import UpdateCamera     from './update'
import UpdateProjection from './update-projection'
import UpdateView       from './update-view'
import UpdateNormal     from './update-normal'
import UpdateModelView  from './update-model-view'
import Assign           from 'object-assign'

function PerspectiveCamera( fieldOfView, aspectRatio, clipping ) {
	
	this.transform        = Transform( this )
	
	this.aspectRatio      = aspectRatio === undefined ? 1           : aspectRatio
	this.clipping         = clipping    === undefined ? [0.01, 100] : clipping
	this.fieldOfView      = fieldOfView === undefined ? Math.PI / 4 : fov

	this.projection       = CreateMat4()
	this.view             = CreateMat4()
	this.normal           = CreateMat3()
	this.modelView        = CreateMat4()
	
	this.update           = UpdateCamera.bind( null, this, {} )
	this.updateProjection = UpdateProjection.bind( null, this )
	this.updateNormal     = UpdateNormal.bind( null, this )
	this.updateView       = UpdateView.bind( null, this )
	this.updateModelView  = UpdateModelView.bind( null, this )
}

export default function perspective( fieldOfView, aspectRatio, clipping ) {
	return new PerspectiveCamera( fieldOfView, aspectRatio, clipping )
}