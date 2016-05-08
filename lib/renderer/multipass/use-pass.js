export default function usePass(multipass) {
  let { gl, passes } = multipass
  for(var i=1; i < arguments.length; i++) {
    var pass = arguments[i]
    passes.push(pass)
    pass.initGL(multipass)
  }
  return multipass
}
