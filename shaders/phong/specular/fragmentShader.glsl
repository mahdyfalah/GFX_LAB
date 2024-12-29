precision mediump float;

uniform vec3 lightDiffuseColor;

varying vec3 fragNormal;
varying vec3 fragLightVector;
varying vec3 fragViewVector;
varying vec3 fragColor;

void main() {
    vec3 N = normalize(fragNormal);
    vec3 L = normalize(fragLightVector);
    vec3 V = normalize(fragViewVector);

    float diffuseIntensity = max(dot(N, L), 0.0);
    vec3 diffuseColor = fragColor.rgb * diffuseIntensity * vec3(0.7, 0.7, 0.7);

    vec3 R = reflect(-L, N);

    vec3 ambientColor = fragColor.rgb * vec3(0.2, 0.2, 0.2);

    float specularIntensity = pow(max(dot(R, V), 0.0), 35.0);
    vec3 specularColor = vec3(1.0, 1.0, 1.0) * specularIntensity;

    vec3 finalColor = ambientColor + diffuseColor + specularColor;

    gl_FragColor = vec4(finalColor, 1.0);
}
