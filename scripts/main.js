//sources:
// https://www.geeksforgeeks.org/how-to-set-up-a-webgl-project/
// https://medium.com/@banksysan_10088/webgl-external-glsl-files-dd7cf85f9ee9

const canvas = document.getElementById('webgl-canvas');
let gl = canvas.getContext('webgl2');

if (!gl) {
    // Fallback to WebGL 1 if WebGL 2 is not available
    gl = canvas.getContext('webgl');
    if (!gl) {
        alert("WebGL isn't available in your browser.");
    }
}

// Define the viewport to cover the whole canvas
gl.viewport(0, 0, canvas.width, canvas.height);
// Set the clear color to white
gl.clearColor(0.0, 0.0, 0.0, 0.0);
// Clear the canvas using the specified clear color
gl.clear(gl.COLOR_BUFFER_BIT);


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

async function init() {
    try {
        // fetch the vertex and fragment shaders from external glsl files
        const vertexShaderSource = await fetchShaderSource('shaders/vertexShader.glsl');
        const fragmentShaderSource = await fetchShaderSource('shaders/fragmentShader.glsl');

        // compile the shaders with the correct type
        const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

        // create program and link shaders
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
        }

        gl.useProgram(program);

        // define vertices
        // every row indicates (x,y,z) of a vertex
        const vertices = new Float32Array([
            0.0, -0.5, 0.0, // bottom
            -0.5, 0.5, 0.0, // top-left
            0.5, 0.5, 0.0   // top-right
        ]);

        // create and bind it to vertices
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
    } catch (error) {
        console.error(error);
    }
}

function main(){
    init()
        .then(() => {
            console.log("WebGL initialization successful.");
        })
        .catch(error => {
            console.error("Error during WebGL initialization:", error);
        });
}

main();