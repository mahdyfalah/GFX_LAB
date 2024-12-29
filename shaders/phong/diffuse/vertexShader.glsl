precision mediump float;

attribute vec3 vertexPosition;
attribute vec3 vertexNormal;
attribute vec3 vertexColor;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform vec4 lightViewPosition;

varying vec3 fragNormal;
varying vec3 fragLightVector;
varying vec3 fragPosition;
varying vec3 fragColor;


void main() {
    // https://stackoverflow.com/questions/63958531/what-is-the-difference-between-phong-shading-and-gouraud-shading
    // in phong most of the light calulations happens per fragment(pixel) compared to vertex in gouraud shading
    vec4 viewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

    fragNormal = normalize(normalMatrix * vertexNormal);

    fragLightVector = normalize(lightViewPosition.xyz - viewPosition.xyz);

    fragColor = vertexColor;

    gl_Position = projectionMatrix * viewPosition;
}
