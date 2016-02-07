import Tokenize from 'glsl-tokenizer/string'
import Stringify from 'glsl-token-string'

// Strip out functions in a file if they are not set to being used by a define.
// Specifically this strips functions from being called from the main() function
// The rendering engine does this at run-time once a shader is compiled

function removeThisFunction (tokens, index) {
  for (var i = index + 1; i < tokens.length; i++) {
    var token = tokens[i]
    
    if (token.type === "operator") {
      if(token.data === ";") {
        //Remove the trailing newline
        var nextToken = tokens[i+1]
        if(nextToken.type === "whitespace" && nextToken.data[0] === "\n") {
          nextToken.data = nextToken.data.substr(1)
        }

        //Remove the previous tabs or spaces
        var prevToken = tokens[index-1]
        if(prevToken.type === "whitespace") {
          var indentation = prevToken.data.match("[\t ]*$")[0]
          prevToken.data = prevToken.data.substr(0, prevToken.data.length - indentation.length)
        }

        // Pull out the function
        tokens.splice(index, i - index + 1)
        return
      }
    }
  }
}

function stripFunctionsByName (tokens, index, fnName) {
  for (var i = index + 1; i < tokens.length; i++) {
    var token = tokens[i]
    
    if (token.type === "ident" && token.data === fnName) {
      removeThisFunction(tokens, i)
    }
  }
}

function findAndStripFollowingFunctions (tokens, index) {
  // Get the next function name, must be an ident
  // Then strip out every instance of it being called
  for (var i = index + 1; i < tokens.length; i++) {
    var token = tokens[i]
    
    if (token.type === "ident") {
      var fnName = token.data
      return stripFunctionsByName(tokens, i, fnName)
    }
  }
}

function getDefines(tokens) {
  var defines = []
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.type === "preprocessor") {
      var results = token.data.match(/#define ([a-zA-Z_]+)/) || []
      if (results[1]) {
        defines.push(results[1])
      }
    }
  }
  return defines
}

export default function stripUnusedFunctions (src) {
  var tokens = Tokenize(src)
  var defines = getDefines(tokens)
  var glamRequiresRegex = /#pragma GLAM_REQUIRES (.+)/

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (token.type === "preprocessor") {
      var result = token.data.match(glamRequiresRegex)
      if (result) {
        // Clear the pragma
        token.data = ""
        var requires = result[1].split(' && ')

        // Figure out if the defines are missing, and if so strip out any
        // remaining functions
        var missingDefines = false
        for (var j = 0; j < requires.length; j++) {
          missingDefines = missingDefines || defines.indexOf(requires[j]) === -1
        }
        if (missingDefines) {
          findAndStripFollowingFunctions(tokens, i)
        }
      }
    }
  }
  return Stringify(tokens)
}

// ;(function() {
//   var material = FlatMaterial()
//   
//   console.time('transpile shader')
//   material.fragSource = mutateScript(Object.getPrototypeOf(material).fragSource, material.defines)
//   material.vertSource = mutateScript(Object.getPrototypeOf(material).vertSource, material.defines)
//   console.timeEnd('transpile shader')
//   return material
// })()