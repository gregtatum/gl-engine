#define GLSLIFY 1
precision mediump float;
#define SHADER_NAME dot screen pass

varying vec2 vUv;
uniform sampler2D tInput;

void main()
{
   vec4 sum = vec4(0);
   vec2 texcoord = vUv;

   for( int i= -4 ;i < 4; i++)
   {
        for ( int j = -3; j < 3; j++)
        {
            sum += texture2D(tInput, texcoord + vec2(j, i)*0.004) * 0.25;
        }
   }
       if (texture2D(tInput, texcoord).r < 0.3)
    {
       gl_FragColor = sum*sum*0.012 + texture2D(tInput, texcoord);
    }
    else
    {
        if (texture2D(tInput, texcoord).r < 0.5)
        {
            gl_FragColor = sum*sum*0.009 + texture2D(tInput, texcoord);
        }
        else
        {
            gl_FragColor = sum*sum*0.0075 + texture2D(tInput, texcoord);
        }
    }
}
// uniform sampler2D tInput;
// uniform vec2 resolution;
// varying vec2 vUv;
//
// vec2 center = .5 * resolution;
// float angle = 1.57;
// float scale = 1.;
//
// float pattern() {
//   float s = sin( angle ), c = cos( angle );
//   vec2 tex = vUv * resolution - center;
//   vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;
//   return ( sin( point.x ) * sin( point.y ) ) * 4.0;
// }
//
// void main() {
//   vec4 color = texture2D( tInput, vUv );
//   float average = ( color.r + color.g + color.b ) / 3.0;
//   gl_FragColor = vec4( color.rgb * vec3( average * 10.0 - 5.0 + pattern() ), color.a );
// }
