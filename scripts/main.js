/*
    sources:
        https://www.geeksforgeeks.org/how-to-set-up-a-webgl-project/
        https://medium.com/@banksysan_10088/webgl-external-glsl-files-dd7cf85f9ee9
        tutorial code from course
*/

const {mat4} = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
let gl = null;
let program = null;
let then = 0;

const locations = {
    attributes: {
        vertexLocation: null,
        colorLocation: null
    }, uniforms: {
        modelViewMatrix: null,
        projectionMatrix: null,
    }
}

const viewMatrix = mat4.create();

window.onload = async () => {
    await setupProgram()

    await setupShapeGenerator()

    handleKeyDownEvents()

    handleMouseEvents()

    // start render loop
    requestAnimationFrame(render);
}

function render(now) {
    // calculate elapsed time in seconds
    let delta = now - then;
    delta *= 0.001;
    then = now;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    shapes.forEach((shape, index) => {
        // scale rotation amount by time difference
        // shape.rotate(1 * delta, [1, 1, 0]);
        shape.draw();

        // show the Axis on the selected object or global axis if all are selected (index = -1)
        if (selectedShapeIndex === index) {
            shape.renderAxes()
        } else if (selectedShapeIndex === -1 && index === 4) {
            shape.renderAxes(true)
        }
    });

    requestAnimationFrame(render)
}

async function setupShapeGenerator() {
    const parsedTetra = await loadOBJ('object-models/tetrahedron.obj')
    const parsedCube = await loadOBJ('object-models/cube.obj')
    const parsedTeapot = await loadOBJ('object-models/teapot.obj')
    const parsedBunny = await loadOBJ('object-models/bunny.obj')
    const parsedJet = await loadOBJ('object-models/10716_JetFighter_v2.obj')

    shapes.push(generatePyramid())
    shapes[0].translate([-2.5, 2.5, 0]);

    shapes.push(generateShape(parsedTetra));
    shapes[1].translate([0, 2.5, 0]);

    shapes.push(generateShape(parsedTetra));
    shapes[2].translate([2.5, 2.5, 0]);

    shapes.push(generateCube());
    shapes[3].translate([-2.5, 0, 0]);

    shapes.push(generateShape(parsedCube));
    shapes[4].translate([0, 0, 0]);

    shapes.push(generateShape(parsedCube));
    shapes[5].translate([2.5, 0, 0]);

    shapes.push(generateShape(parsedTeapot));
    shapes[6].translate([-2.5, -2.5, 0]);

    shapes.push(generateShape(parsedBunny));
    shapes[7].translate([0, -2.5, 0]);
    shapes[7].scale([8, 8, 8]);

    shapes.push(generateShape(parsedJet));
    shapes[8].translate([2.5, -2.5, 0]);
    shapes[8].scale([0.002, 0.002, 0.002]);
}
