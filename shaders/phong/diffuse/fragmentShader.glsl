precision mediump float;

varying vec3 fragNormal;
varying vec3 fragLightVector;
varying vec3 fragColor;

void main() {
    vec3 N = normalize(fragNormal);
    vec3 L = normalize(fragLightVector);

    float diffuseIntensity = max(dot(N, L), 0.0);

    vec3 ambientColor = fragColor.rgb * vec3(0.2, 0.2, 0.2);
    vec3 diffuseColor = fragColor.rgb * diffuseIntensity * vec3(0.7, 0.7, 0.7);

    vec3 finalColor = ambientColor + diffuseColor;

    gl_FragColor = vec4(finalColor, 1.0);
}
