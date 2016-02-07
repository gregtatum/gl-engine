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

export default function stripUnusedFunctions (src, defines) {
  var tokens = Tokenize(src)
  var glamRequiresRegex = /#pragma GLAM_REQUIRES (\w+)/
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    
    if (token.type === "preprocessor") {
      var result = token.data.match(glamRequiresRegex)
      if (result) {
        var define = result[1]
        token.data = ""
        if (defines.indexOf(define) === -1) {
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