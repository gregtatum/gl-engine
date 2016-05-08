import CreateShader from 'gl-shader'
const PASS_THROUGH = require('fs').readFileSync(
  require('path').resolve(__dirname, '../vertex.glsl'), 'utf8'
)

export default function compileShader (pass, source, gl) {
  pass.program = CreateShader(gl, PASS_THROUGH, source)
  return pass.program
}
