/*
*   source:
*       tutorial code from course
*/

function generateCube() {
    const vertices = [
        0.5, 0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,

        -0.5, 0.5, 0.5,
        -0.5, -0.5, 0.5,
        0.5, -0.5, 0.5, // front face end

        -0.5, -0.5, -0.5,
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,

        -0.5, -0.5, -0.5,
        -0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5, // left face end

        0.5, 0.5, -0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,

        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
        -0.5, -0.5, -0.5, // back face end

        0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,

        0.5, -0.5, 0.5,
        -0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5, // bottom face end

        0.5, 0.5, 0.5,
        0.5, -0.5, -0.5,
        0.5, 0.5, -0.5,

        0.5, -0.5, -0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5, // right face end

        0.5, 0.5, 0.5,
        0.5, 0.5, -0.5,
        -0.5, 0.5, -0.5,

        0.5, 0.5, 0.5,
        -0.5, 0.5, -0.5,
        -0.5, 0.5, 0.5, // top face end
    ];



    const colorData = [
        [1.0, 0.0, 1.0], // top face: pink
        [0.0, 0.0, 1.0], // Bottom face: blue
        [1.0, 0.0, 0.0], // left face: red
        [0.0, 1.0, 0.0], // back face: green
        [1.0, 1.0, 0.0], // Right face: yellow
        [0.0, 1.0, 1.0], // Front face: bright blue
    ];

    const colors = [];

    /// add one color per face, so 6 times for each color
    colorData.forEach(color => {
        for (let i = 0; i < 6; ++i) {
            colors.push(color);
        }
    });

    // create shape object and initialize data
    const cube = new Shape();
    cube.initData(vertices, colors)

    return cube;
}