precision mediump float;

attribute vec3 vertexPosition;
attribute vec3 vertexColor;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 fragmentColor;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
    fragmentColor = vertexColor;
}