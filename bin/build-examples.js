var Execute = require('child_process').exec
var Prompt = require('prompt')

var examples = [
  [
    '01-hello-world/',
    'hello-world.js',
    'Hello World'
  ],
  [
    '02-fog/',
    'fog.js',
    'Fog Augment'
  ],
  [
    '03-normal-colors/',
    'normal-colors.js',
    'Normal Colors Augment'
  ]
]

examples.forEach(function (example) {
  var source = 'examples/' + example[0]
  var target = 'gh-pages/' + source
  var file = example[1]
  var name = example[2]

  Execute('mkdir -p ' + target)

  browseriyFiles(source, target, file)
  outputIndexHtml(target, name)
})

function browseriyFiles (source, target, file) {
  var command = [
    'browserify ', source, file,
    ' --debug',
    ' -t [ babelify --presets [ es2015 ] ]',
    ' -t brfs -t glslify',
    ' -g uglifyify',
    ' | exorcist ', target, 'bundle.js.map > ', target, 'bundle.js'
  ].join('')

  console.log(command)
  var process = Execute(command)
  process.stdout.pipe(process.stdout)
}

function outputIndexHtml (destination, name) {
  var html = [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    "	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>",
    "	<meta name='viewport' content='width=device-width, initial-scale=1' />",
    '	<title>' + name + ' | Glam</title>',
    '</head>',
    '<body>',
    "	<script src='bundle.js' type='text/javascript' charset='utf-8'></script>",
    '</body>',
    '</html>',
  ].join('\n')

  require('fs').writeFile(destination + 'index.html', html)
}
