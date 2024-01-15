varying float vElevation;

uniform vec3 uLightColor;
uniform vec3 uDarkColor;

void main()
{   float colorOffset = 0.18;
    float colorMultiplier =5.0;

    float mixRange = (vElevation * colorMultiplier) + colorOffset;

    vec3 mixedColor = mix(uDarkColor,uLightColor,mixRange);

    gl_FragColor = vec4(mixedColor,1.0);
}