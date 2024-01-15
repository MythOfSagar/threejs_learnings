uniform float uSize;                      //uniform means same for each pixel
uniform float uTime; 

attribute float uEachParticleRandomScale; //Attribute means Differnt for each pixel
attribute vec3 uRandomness;
varying vec3 vColor;

void main()
{
   vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float angle = atan(modelPosition.x,modelPosition.z);//angle between point and one ref line
    float distanceFromCenter = length(modelPosition.xz);//distance from center

    float angleOffset = (1.0/distanceFromCenter) * uTime * 0.2;
 angle+=angleOffset;

  modelPosition.x = cos(angle) * distanceFromCenter;
  modelPosition.z = sin(angle) * distanceFromCenter;

  modelPosition.xyz += uRandomness;

   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;   
   
    gl_PointSize = uSize * uEachParticleRandomScale;

    gl_PointSize *= 1.0/-viewPosition.z;//Size Attenuation

    vColor = color;
}