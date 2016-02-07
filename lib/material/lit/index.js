import SetUniforms from './set-uniforms'
import SetAttributes from './set-attributes'
import Assign from 'object-assign'
import UseAugment from '../../augment/use-augment'

function LitMaterial (shadingConfig) {
  this.flags = {
    visible: true,
    transparent: false,
    recompile: true,
    useLights: true
  }

  this.defines = ['CAMERA', 'NORMAL']
  this.shader = null
  this.mode = 'TRIANGLES'
  this.setUniforms = [SetUniforms]
  this.setAttributes = [SetAttributes]
  this.shading = shadingConfig

  this.use = UseAugment.bind(null, this)
}

LitMaterial.prototype.fragSource = require('fs').readFileSync(__dirname + '/lit.built.frag', 'utf8')
LitMaterial.prototype.vertSource = require('fs').readFileSync(__dirname + '/lit.built.vert', 'utf8')

export default function createLitMaterial (properties) {
  var shadingConfig = Assign({
    color: [0.1, 0.1, 0.1],
    opacity: 1.0
  }, properties)

  return new LitMaterial(shadingConfig)
}
