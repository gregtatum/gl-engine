import Invert from 'gl-mat4/invert'

export default function updateView( camera ) {
	Invert( camera.view, camera.transform.global )
}