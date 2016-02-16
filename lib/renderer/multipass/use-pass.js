export default function usePass(postProcessor) {
  let { gl, passes } = postProcessor
  for(var i=1; i < arguments.length; i++) {
    var pass = arguments[i]
    passes.push(pass)
    pass.initGL(postProcessor, gl)
  }
  return postProcessor
}
