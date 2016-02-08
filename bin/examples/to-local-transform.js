var through = require('through2')

module.exports = function (file) {
  return through(function (chunk, encoding, next) {
    var findRequire = /require\(['"]gl-engine['"]\)/
    var localRequire = "require('../../lib')"

    this.push(
      chunk.toString('utf8').replace(findRequire, localRequire)
    )
    next()
  })
}
