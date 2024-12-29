const {mat4, mat3, vec4} = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
let gl = null;
let program = null;
let then = 0;

const locations = {
    attributes: {
        vertexLocation: null,
        colorLocation: null,
        normalLocation: null
    }, uniforms: {
        modelViewMatrix: null,
        projectionMatrix: null,
        normalMatrix: null,
        lightPosition: null
    }
}

const shaderConfigs = {
    "gouraudDiffuse": {
        vertex: 'shaders/gouraud/diffuse/vertexShader.glsl',
        fragment: 'shaders/gouraud/diffuse/fragmentShader.glsl'
    },
    "gouraudSpecular": {
        vertex: 'shaders/gouraud/specular/vertexShader.glsl',
        fragment: 'shaders/gouraud/specular/fragmentShader.glsl'
    },
    "phongDiffuse": {
        vertex: 'shaders/phong/diffuse/vertexShader.glsl',
        fragment: 'shaders/phong/diffuse/fragmentShader.glsl'
    },
    "phongSpecular": {
        vertex: 'shaders/phong/specular/vertexShader.glsl',
        fragment: 'shaders/phong/specular/fragmentShader.glsl'
    }
};

const shaderPrograms = {};

const lightPosition = vec4.fromValues(0 , 10, 0, 1);

const viewMatrix = mat4.create();