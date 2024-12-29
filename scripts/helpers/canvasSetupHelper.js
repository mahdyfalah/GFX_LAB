function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:',
            gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

async function fetchShaderSource(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load shader from ${url}: ${response.statusText}`);
    }
    return response.text();
}

async function loadAllShaders() {
    for (const [key, paths] of Object.entries(shaderConfigs)) {
        const vertexShaderSource = await fetchShaderSource(paths.vertex);
        const fragmentShaderSource = await fetchShaderSource(paths.fragment);

        const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);


        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(`Error linking program for ${key}:`, gl.getProgramInfoLog(program));
            continue;
        }

        shaderPrograms[key] = program;
    }
}

function saveAttributeAndUniformLocations() {
    locations.attributes.vertexLocation = gl.getAttribLocation(program, "vertexPosition");
    locations.attributes.colorLocation = gl.getAttribLocation(program, "vertexColor");
    locations.attributes.normalLocation = gl.getAttribLocation(program, "vertexNormal")

    locations.uniforms.modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    locations.uniforms.projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");

    locations.uniforms.normalMatrix = gl.getUniformLocation(program, "normalMatrix")
    locations.uniforms.lightPosition = gl.getUniformLocation(program, "lightViewPosition")
}

function createProjectionMatrix(){
    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    gl.uniformMatrix4fv(locations.uniforms.projectionMatrix, gl.FALSE, projectionMatrix);
}

function createViewMatrix(){
    mat4.lookAt(viewMatrix, [0, 0, 10], [0, 0, 0], [0, 1, 0]);
}

function setActiveShader(shaderKey) {
    if (!shaderPrograms[shaderKey]) {
        console.error(`Shader program "${shaderKey}" not found.`);
        return;
    }

    program = shaderPrograms[shaderKey];
    gl.useProgram(program);

    saveAttributeAndUniformLocations();
    createProjectionMatrix();
    createViewMatrix();
}

async function setupProgram() {
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(40/255, 40/255, 43/255, 1);

    await loadAllShaders();

    setActiveShader("gouraudDiffuse");
}
