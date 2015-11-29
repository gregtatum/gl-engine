import perspective from './lib/camera/perspective'
import geometry from './lib/geometry'
import flat from './lib/material/flat'
import mesh from './lib/mesh'
import straight from './lib/renderer/straight'
import scene from './lib/scene'
import transform from './lib/transform'

export { geometry, mesh, scene, transform }

export let camera = {
	perspective : perspective
}
export let material = {
	flat : flat
}
export let renderer = {
	straight : straight
}
