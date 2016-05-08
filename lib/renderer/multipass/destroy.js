export default function destroy(fbos) {
  for(var i=0; i < fbos.length; i++) {
    fbos[i].dispose()
  }
}
