#!/bin/bash
es5=./es5/lib
es6=./lib/.

# Remove any existing es5 folder
rm -rf $es5

# Make sure the es5 folder exists
test -d "$es5" || mkdir -p "$es5"

# Copy over the files to ensure the .glsl files get transferred
cp -rf $es6 $es5

# Overwrite .js files with transpiled code
babel --presets es2015 -d $es5 $es6