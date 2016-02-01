import Assign from 'object-assign'
import SetUniforms from './set-uniforms'
import UseAugment from '../use-augment'
import SetDirectionalLightUniforms from '../../light/directional/set-uniforms'

function Lambert (material, config) {
  this.flags = Assign({}, material.flags, {
    recompile: true,
    useLights: true
  })

  this.fragSource = material.fragSource
  this.vertSource = material.vertSource

  this.defines = material.defines.concat('LAMBERT')
  this.shader = null
  this.mode = material.mode

  this.setUniforms = material.setUniforms.concat([ SetUniforms, SetDirectionalLightUniforms ])
  this.setAttributes = material.setAttributes.slice()

  this.shading = material.shading
  this.use = UseAugment.bind(null, this)

  this.shading = Assign({ lambert: config }, material.shading)
}

export default function createLambert (material, properties) {
  var config = Assign({
    diffuse: [1, 1, 1]
  }, properties)

  if (typeof material === 'function') {
    return function createMaterialWithLambert () {
      // TODO - Create a function to do this thing
      var arity = material.length
      var originalMaterialArgs = Array.prototype.slice.call(arguments, 0, arity)
      var newConfig = Assign({}, config, arguments[arity])

      return new Lambert(material.apply(this, originalMaterialArgs), newConfig)
    }
  } else {
    return new Lambert(material, config)
  }
}
