// Browserify Transforms:
import SetUniforms from './set-uniforms'
import SetAttributes from './set-attributes'
import Assign from 'object-assign'
import UseAugment from '../../augment/use-augment'

function FlatMaterial (shadingConfig) {
  this.flags = {
    visible: true,
    transparent: false,
    recompile: true,
    useLights: false
  }

  this.defines = ['CAMERA']
  this.shader = null
  this.mode = 'TRIANGLES'
  this.setUniforms = [SetUniforms]
  this.setAttributes = [SetAttributes]
  this.shading = shadingConfig
  this.use = UseAugment.bind(null, this)
}

FlatMaterial.prototype.fragSource = require('fs').readFileSync(__dirname + '/flat.built.frag', 'utf8')
FlatMaterial.prototype.vertSource = require('fs').readFileSync(__dirname + '/flat.built.vert', 'utf8')

export default function createFlatMaterial (properties) {
  var shadingConfig = Assign({
    color: [0.1, 0.1, 0.1],
    opacity: 1.0
  }, properties)

  return new FlatMaterial(shadingConfig)
}
