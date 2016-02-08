# gl-engine/material

Hello, welcome! I'm so glad you could join me. This is where materials are built. Let me be your guide.

## gl-engine/material/common

This folder contains import declarations for the various shared shader code. Each of the augmentations contain shader code that gets imported into the common shader code. The common code then is pruned with #ifdef checks in the code snippets, so that once the shader is compiled those bits of code that aren't needed will be pruned away.

## Building shaders

Rather than directly calling `glslify` as a transform, the shaders are built. This is to aid in understanding how the code works, as there is an easy place in the source code to find the full code. To build the shaders on changing any glsl code run:

	npm run build:shaders