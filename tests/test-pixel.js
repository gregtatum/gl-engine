import ReadPixel from './read-pixel'

// Fuzzily checks a pixel
function testPixel (t, a, b, message, epsilon) {

  var pass = (a.length === b.length)
  for(var i=0; i < b.length; i++) {
    pass = pass && Math.abs(a[i] - b[i]) < epsilon
  }
  t._assert(pass, {
      message : message,
      operator : 'testPixel',
      actual : a,
      expected : b
  })
}

export default function createPixelTester (t, gl, epsilon = 2) {
  return function runPixelTester (x, y, comparison, message = 'pixels do not match') {
    let pixel = ReadPixel(gl, x, y)
    testPixel(t, pixel, comparison, message, epsilon)
  }
}
