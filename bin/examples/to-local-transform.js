var through = require('through2')

module.exports = function (file) {
  return through(function (chunk, encoding, next) {
    var findGlamRequire = /require\(['"]glam['"]\)/
    var glamLocalRequire = "require('../../lib')"

    this.push(
      chunk.toString('utf8').replace(findGlamRequire, glamLocalRequire)
    )
    next()
  })
}
