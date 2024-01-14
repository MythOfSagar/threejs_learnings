precision mediump float;

//We cannot use attributes in fragment, insted use varying

// varying float vRandom;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;

void main() 
{
  vec4 texture = texture2D(uTexture,vUv);
  texture.rgb += 0.65;
  gl_FragColor = texture;
}
