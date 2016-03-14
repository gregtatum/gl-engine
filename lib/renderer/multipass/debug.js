import CreateFBO from 'gl-fbo'
import CreateShader from 'gl-shader'
import CreateBuffer from 'gl-buffer'
import CreateVAO from 'gl-vao'
import RenderScreen from 'a-big-triangle'

const MARGIN = 0.05

function drawPassShader (gl) {
  return CreateShader(gl,
    ` #define SHADER_NAME drawPass
      #define MARGIN ${MARGIN}

      attribute vec2 aPosition;

      uniform vec2 uScale;
      uniform vec2 uOffset;
      uniform vec2 uResolution;

      varying vec2 vUv;

      void main() {
        vec2 position = (aPosition * 0.5 + 0.5); // [-1, 1] -> [0, 1]
        // vUv = position * uScale - vec2(30.45, 425.0) / vec2(609.0, 774.0);
        vUv = (position - uOffset) * uScale;

        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `,
    ` precision mediump float;
      #define SHADER_NAME drawPass

      uniform sampler2D uInput;

      varying vec2 vUv;

      void main() {
        gl_FragColor = texture2D(uInput, vUv);
      }
  `)
}

// Draw a small thumbnail image of the output
function drawPass (bindings, passIndex, passCount, outputFBO) {
  var { debugFBO, gl, canvas, shader, quad, resolution, scale, offset } = bindings
  var { uniforms } = shader
  var { width, height } = canvas

  debugFBO.bind()
  shader.bind()

  // update shader
  var resizeResolutionX = width / passCount * (1 - MARGIN * 2)
  var resizeResolutionY = height / passCount * (1 - MARGIN * 2)
  resolution[0] = width
  resolution[1] = height
  scale[0] = width / resizeResolutionX
  scale[1] = height / resizeResolutionY
  var scissorOffsetX = width * passIndex / passCount + width / passCount * MARGIN
  var scissorOffsetY = (height / 2) - (resizeResolutionY / 2)
  offset[0] = scissorOffsetX / width
  offset[1] = scissorOffsetY / height
  uniforms.uOffset = offset
  uniforms.uResolution = resolution
  uniforms.uScale = scale
  uniforms.uInput = outputFBO.color[0].bind(0)

  // set scissor
  gl.enable(gl.SCISSOR_TEST)
  gl.scissor(
    // coordinate of lower left of box, moving up and to the right
    scissorOffsetX,
    scissorOffsetY,
    resizeResolutionX,
    resizeResolutionY
  )

  // clear first, then draw on it
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.disable(gl.DEPTH_TEST)
  RenderScreen(gl)

  // reset state
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.disable(gl.SCISSOR_TEST)
  gl.enable(gl.DEPTH_TEST)
  gl.scissor(0, 0, width, height)
}

function drawToScreenShader (gl) {
  return CreateShader(gl,
    ` #define SHADER_NAME drawToScreen

      attribute vec2 aPosition;
      varying vec2 vUv;

      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, -1.0, 1.0);
      }
    `,
    ` precision mediump float;
      #define SHADER_NAME drawToScreen

      uniform sampler2D uInput;
      varying vec2 vUv;

      void main() {
        vec4 frag = texture2D(uInput, vUv);
        if(frag.a == 0.0) {
          discard;
        } else {
          gl_FragColor = texture2D(uInput, vUv);
        }
      }
  `)
}

function drawToScreen (bindings, finalFBO) {
  var { debugFBO, shader, gl } = bindings
  gl.disable(gl.DEPTH_TEST)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  shader.bind()
  shader.uniforms.uInput = finalFBO.color[0].bind(1)
  RenderScreen(gl)

  shader.uniforms.uInput = debugFBO.color[0].bind(2)
  RenderScreen(gl)
  gl.disable(gl.DEPTH_TEST)
}

export default function createDebugger (gl) {
  var canvas = gl.canvas
  var debugFBO = CreateFBO(gl, [canvas.width, canvas.height])
  var quad = CreateVAO(gl, [{
    buffer: CreateBuffer(gl, new Float32Array([-1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1])),
    type: gl.FLOAT,
    size: 2
  }])

  return {
    drawPass: drawPass.bind(null, {
      debugFBO,
      gl,
      quad,
      canvas,
      shader: drawPassShader(gl),
      resolution: [],
      scale: [],
      offset: []
    }),
    drawToScreen: drawToScreen.bind(null, {
      debugFBO,
      gl,
      shader: drawToScreenShader(gl)
    })
  }
}
