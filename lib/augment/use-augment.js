export default function useAugment (oldMaterial, newMaterial, properties) {
  return newMaterial(oldMaterial, properties)
}
