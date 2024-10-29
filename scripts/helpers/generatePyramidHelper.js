function generatePyramid() {
    const vertices = [
        // Base (square)
        -0.5, -0.5, -0.5,
        0.5, -0.5, -0.5,
        0.5, -0.5,  0.5,

        -0.5, -0.5, -0.5,
        0.5, -0.5,  0.5,
        -0.5, -0.5,  0.5, // base end

        // Sides (triangles)
        -0.5, -0.5, -0.5,  // base left
        0.5, -0.5, -0.5,  // base right
        0.0,  0.5,  0.0,  // peak

        0.5, -0.5, -0.5,  // base back right
        0.5, -0.5,  0.5,  // base front right
        0.0,  0.5,  0.0,  // peak

        0.5, -0.5,  0.5,  // base front right
        -0.5, -0.5,  0.5,  // base front left
        0.0,  0.5,  0.0,  // peak

        -0.5, -0.5,  0.5,  // base front left
        -0.5, -0.5, -0.5,  // base back left
        0.0,  0.5,  0.0,  // peak
    ];

    const colorData = [
        [1.0, 0.0, 0.0], // red
        [0.0, 1.0, 0.0], // green
        [0.0, 0.0, 1.0], // blue
        [1.0, 1.0, 0.0], // yellow
        [1.0, 0.5, 0.0], // orange
    ];

    const colors = [];

    // Add one color per face
    colorData.forEach(color => {
        for (let i = 0; i < 3; ++i) { // 3 vertices per triangle face
            colors.push(color);
        }
    });

    // Create shape object and initialize data
    const pyramid = new Shape();
    pyramid.initData(vertices, colors);

    return pyramid;
}
