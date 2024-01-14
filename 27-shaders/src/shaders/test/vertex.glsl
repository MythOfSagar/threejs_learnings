uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform vec2 uFrequency;
uniform float uTime;

attribute vec2 uv;
varying vec2 vUv;

attribute vec3 position;
//attribute float aRandom;

// varying float vRandom;

void main()
//This function been called on Init
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

      modelPosition.z += sin(uFrequency.x* modelPosition.x + uTime) * 0.2;
      modelPosition.z += sin(uFrequency.y* modelPosition.y + uTime) * 0.2;
     //modelPosition.z += aRandom * 0.2;

    vec4 viewPosition  = viewMatrix * modelPosition;
    vec4 projectionPosition  = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

vUv = uv;

    // vRandom = aRandom;
}


// vec2 vector2 = vec2(1.0,2.0); 
//vec2 vector2 = vector3.yx gives vec4(2.0,1.0)

// vec3 vector3 = vec3(1.0,2.0,3.0);  vec3(vector2,3.0)
// vec4 vector4 = vec4(1.0,2.0,3.0,4.0); vec4(vector3,4.0)

// vector4.x,vector4.y,vector4.z,vector4.w

// xyzw
// rgba

// 2 * vec2(1.0,2.0) = vec2(2.0,4.0)