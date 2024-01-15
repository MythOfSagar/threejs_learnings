varying vec3 vColor;

void main()
{   
    //gl_PointCoord is a cordinate giving x and y position value

    float distance = distance(gl_PointCoord,vec2(0.5,0.5));//distabnce between centre of square particle and gl_PointCoord
    float strength = 1.0 - step(0.5,distance);
    vec3 patternCircle = vec3(strength);

    float fadedStrength = 1.0 - (2.0 * distance); //Linearely
    vec3 fadingCircle = vec3(fadedStrength);

    float fadedStrengthFaster = pow((1.0 - distance),3.0); //Exponentially
    vec3 fadingCircleFaster = vec3(fadedStrengthFaster);

    vec3 mixBlackAndOtherColor = mix(vec3(0.0),vColor,fadedStrengthFaster);
  
    gl_FragColor = vec4(mixBlackAndOtherColor,1.0);

}