import CanvasFit from 'canvas-fit'

export default function autoResizeCanvas (canvas, parentEl, doAutoResize) {
  if (doAutoResize) {
    var resize = CanvasFit(canvas, parentEl)
    window.addEventListener('resize', resize, false)
    resize()

    return function stopResizeHandler () {
      window.removeEventListener('resize', resize, false)
    }
  }

  return function doNothing () {}
}
