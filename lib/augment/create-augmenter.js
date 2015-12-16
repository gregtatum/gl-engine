function newMaterialFactory( augmentor, baseMaterialFactory) {
	
	return function augmentedMaterial() {
		
		var arity = baseMaterialFactory.length
		var originalMaterialArgs = Array.prototype.slice.call(arguments, 0, arity)
		var newNormalConfig = Assign( {}, normalConfig, arguments[arity] )
		
		return new augmentor( baseMaterialFactory.apply(this, originalMaterialArgs), newNormalConfig )
	}
	
}

module.exports = function augmentFactory( augmentor, input ) {
	
	if( typeof input === 'function' ) {
		
		return newMaterialFactory( augmentor, input )
		
	} else {
		return new constructor( material, normalConfig )
	}
}