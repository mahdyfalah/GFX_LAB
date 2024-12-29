precision mediump float;

attribute vec3 vertexPosition;
attribute vec3 vertexColor;
attribute vec3 vertexNormal;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform vec4 lightViewPosition;

varying vec3 fragmentColor;

void main() {
    // https://teaching.vda.univie.ac.at/graphics/24w/LectureNotes/webgl_tutorial/WebGL_Tutorium_2.pdf page 19
    vec4 viewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

    vec3 L = normalize(lightViewPosition.xyz - viewPosition.xyz);
    vec3 N = normalize(normalMatrix * vertexNormal);


    vec3 ambientColor = vertexColor.rgb * vec3(0.2, 0.2, 0.2);
    float diffuseIntensity = max(dot(L, N), 0.0);
    vec3 diffuseColor = vertexColor.rgb * diffuseIntensity * vec3(0.7, 0.7, 0.7);

    fragmentColor = ambientColor + diffuseColor;
    gl_Position = projectionMatrix * viewPosition;
}