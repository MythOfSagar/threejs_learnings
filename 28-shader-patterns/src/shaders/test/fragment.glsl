varying vec2 vUv;

void main()
{   float alpha = 1.0;
    float strength = 1.0;

    vec4 pattern1 = vec4(vUv, 1.0, alpha);

    vec4 pattern2 = vec4(vUv, 0.5, alpha);

    vec4 pattern3 = vec4(vUv.x, vUv.x, vUv.x,alpha);

    vec4 pattern3_1 = vec4(abs(vUv.x-0.5), abs(vUv.x-0.5), abs(vUv.x-0.5),alpha);

    vec4 pattern4 = vec4(vUv.y, vUv.y, vUv.y,alpha);

    vec4 pattern4_1 = vec4(abs(vUv.y-0.5), abs(vUv.y-0.5), abs(vUv.y-0.5),alpha);

    vec4 pattern3_4_1 = vec4(min(abs(vUv.y-0.5),abs(vUv.x-0.5)), min(abs(vUv.y-0.5),abs(vUv.x-0.5)), min(abs(vUv.y-0.5),abs(vUv.x-0.5)),alpha);

    vec4 pattern3_4_2 = vec4(max(abs(vUv.y-0.5),abs(vUv.x-0.5)), max(abs(vUv.y-0.5),abs(vUv.x-0.5)), max(abs(vUv.y-0.5),abs(vUv.x-0.5)),alpha);

    vec4 pattern3_4_3 = vec4(step(0.25,max(abs(vUv.y-0.5),abs(vUv.x-0.5))), step(0.25,max(abs(vUv.y-0.5),abs(vUv.x-0.5))), step(0.25,max(abs(vUv.y-0.5),abs(vUv.x-0.5))),alpha);

    vec4 pattern5 =1.0 - vec4(vUv.y, vUv.y, vUv.y,alpha);

    vec4 pattern6 =7.0 * vec4(vUv.y, vUv.y, vUv.y,alpha);
    
    float oneOfTenth = mod(vUv.y * 10.0, 1.0);
    vec4 pattern7 =7.0 * vec4(oneOfTenth, oneOfTenth, oneOfTenth,alpha);

    float halfOneOfTenth = mod(vUv.y * 10.0, 1.0);
    halfOneOfTenth = step(0.5,halfOneOfTenth); // halfOneOfTenth will be applied after 0.5
    vec4 pattern8 = vec4(halfOneOfTenth, halfOneOfTenth, halfOneOfTenth,alpha);
    
    float barY = mod(vUv.x * 10.0, 1.0);
    float copy = step(0.8,barY); // copy will be applied after 0.5
    vec4 pattern9 = vec4(copy, copy, copy,alpha);

    float barX = mod(vUv.y * 10.0, 1.0);
    float copy1 = step(0.8,barX); // copy1 will be applied after 0.5
    vec4 pattern10 = vec4(copy1, copy1, copy1,alpha);
    
    float copy3 = copy + copy1;
    vec4 pattern11 = vec4(copy3, copy3, copy3,alpha);

    float copy4 = copy * copy1;
    vec4 pattern12 = vec4(copy4, copy4, copy4,alpha);
    
    float stepVal = 0.1;
    float copy5 = step(stepVal,barY) * step(stepVal,barX);
    vec4 pattern13 = vec4(copy5, copy5, copy5,alpha);

    float copy6 = step(0.8,barY) * step(0.4,barX);
    vec4 pattern14 = vec4(copy6, copy6, copy6,alpha);

    float copy7 = step(0.4,barY) * step(0.8,barX);
    vec4 pattern15 = vec4(copy7, copy7, copy7,alpha);

    vec4 pattern16 = vec4(copy6 + copy7, copy6 + copy7, copy6 + copy7,alpha);

    vec4 pattern17 = vec4((copy6) + (copy7), (copy6) + (copy7), (copy6) + (copy7),alpha);
 
    float strengthX = floor(vUv.x * 10.0) / 10.0;
    vec4 pattern18 = vec4(strengthX, strengthX, strengthX,alpha);

    float strengthY = floor(vUv.y * 10.0) / 10.0;
    vec4 pattern19 = vec4(strengthY, strengthY, strengthY,alpha);

    vec4 pattern20 = vec4(strengthY*strengthX, strengthY*strengthX, strengthY*strengthX,alpha);

    gl_FragColor = pattern20;
}