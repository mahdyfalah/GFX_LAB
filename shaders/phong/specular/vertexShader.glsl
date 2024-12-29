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
varying vec3 fragViewVector;
varying vec3 fragColor;

void main() {
    vec4 viewPosition = modelViewMatrix * vec4(vertexPosition, 1.0);

    fragNormal = normalize(normalMatrix * vertexNormal);

    fragLightVector = normalize(lightViewPosition.xyz - viewPosition.xyz);

    fragViewVector = normalize(-viewPosition.xyz);

    fragColor = vertexColor;

    gl_Position = projectionMatrix * viewPosition;
}
