import Test from 'tape'
import { Engine } from '../../lib'

Test('Engine', function (t) {
  t.test('Verify created a correctly shaped object', function (t) {
    t.plan(5)

    let fn = function (intEngine, scene, renderer) {
      t.equal(intEngine, extEngine, 'The external and internal engines match')
      t.equal(typeof scene, 'object', 'Provides a scene')
      t.equal(typeof renderer, 'object', 'Provides a renderer')
      renderer.destroy()
    }

    let config = {
      autoStart: false
    }

    let extEngine = Engine(fn, config)

    t.equal(typeof extEngine.loop, 'object', 'Provides a loop')
    t.equal(typeof extEngine.on, 'function', 'Hooks on the event emitter')

  // TODO - Should I test this out more?
  })
})
