precision mediump float;
#define SHADER_NAME lit material

#pragma glslify: import('./vars.frag')

void main() {
	#pragma glslify: import('./main.frag')
}
