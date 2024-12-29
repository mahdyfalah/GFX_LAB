precision mediump float;

attribute vec3 vertexPosition;
attribute vec3 vertexColor;
attribute vec3 vertexNormal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform vec4 lightViewPosition;
uniform vec3 viewPosition;

varying vec3 fragmentColor;

void main() {
    vec4 viewPos = modelViewMatrix * vec4(vertexPosition, 1.0);

    vec3 L = normalize(lightViewPosition.xyz - viewPos.xyz);
    vec3 N = normalize(normalMatrix * vertexNormal);
    vec3 E = normalize(viewPosition - viewPos.xyz);

    // calculating refletion vector using native glsl function
    // essentially same as {R = -L - 2.0 * dot(-L, N) * N} described in the course
    // https://teaching.vda.univie.ac.at/graphics/24w/LectureNotes/07_illum.pdf page 27
    vec3 R = reflect(-L, N);

    vec3 ambientColor = vertexColor.rgb * vec3(0.2, 0.2, 0.2); // hardcoded ambient coefficient


    float diffuseIntensity = max(dot(L, N), 0.0);
    vec3 diffuseColor = vertexColor.rgb * diffuseIntensity * vec3(0.7, 0.7, 0.7); // hardcoded diffuse coefficient

    // https://learnopengl.com/Lighting/Basic-Lighting for calculating specular intensity
    float specularIntensity = pow(max(dot(E, R), 0.0), 32.0);
    vec3 specularColor = vec3(1.0, 1.0, 1.0) * specularIntensity; // hardcoded specular light color value

    // https://teaching.vda.univie.ac.at/graphics/24w/LectureNotes/07_illum.pdf page 19
    vec3 finalColor = ambientColor + diffuseColor + specularColor;

    fragmentColor = finalColor;

    gl_Position = projectionMatrix * viewPos;
}
