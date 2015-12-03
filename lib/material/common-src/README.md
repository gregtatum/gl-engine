# common-src

This folder contains import declarations for the various shared shader code. `glslify-import` does not support recursive import calls. This folder contains the raw source code, and then `npm run build:shaders` takes these files and outputs into `/lib/material/common` so that the other materials can easily import these files.