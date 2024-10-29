class Shape {
    axisLengths = [1, 1, 1];
    translationFactors =[0, 0, 0]
    scaleFactors = [1, 1, 1];

    constructor() {
        this.vertices = [];
        this.colors = [];

        this.buffers = {
            // initialize buffers
            vertexBuffer: gl.createBuffer(),
            colorBuffer: gl.createBuffer(),
        }

        // initialize model and modelView matrices
        this.modelMatrix = mat4.create();
        this.modelViewMatrix = mat4.create();
    }

    initData(vertices, colors) {
        // flatten & convert data to 32 bit float arrays 
        this.vertices = new Float32Array(vertices.flat());
        this.colors = new Float32Array(colors.flat());

        /// send data to buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
    }

    draw() {
        // set up attributes
        Shape.setupAttribute(this.buffers.vertexBuffer, locations.attributes.vertexLocation);
        Shape.setupAttribute(this.buffers.colorBuffer, locations.attributes.colorLocation);

        // combine view and model matrix into modelView matrix
        mat4.mul(this.modelViewMatrix, viewMatrix, this.modelMatrix);
        // send modelView matrix to GPU
        gl.uniformMatrix4fv(locations.uniforms.modelViewMatrix, gl.FALSE, this.modelViewMatrix);

        // draw the object
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 3);
    }

    rotate(angle, axis, global = false) {
        if (!global) {
            /**
             * The transformation functions that glMatrix provides apply the new transformation as the right hand operand,
             * which means the new transformation will be the first one to be applied (this will result in a local transformation)
             *
             * The function call below would look like this if you write down the matrices directly:
             * modelMatrix * rotationMatrix
             */
            mat4.rotate(this.modelMatrix, this.modelMatrix, angle, axis);
        } else {
            /**
             * To get world transformations, you need to apply the new transformation after all the other transformations, i.e. as the left-most operand:
             * rotationMatrix * modelMatrix
             *
             * You can do this manually by constructing the transformation matrix and then using mat4.multiply(out, leftOperand, rightOperand).
             */
            const rotationMatrix = mat4.create();
            mat4.fromRotation(rotationMatrix, angle, axis);
            mat4.mul(this.modelMatrix, rotationMatrix, this.modelMatrix)
        }
    }

    translate(vector) {
        this.translationFactors = this.translationFactors
            .map((x, i )=> x + vector[i])

        // to handle movementSpeed of scaled shapes
        if (this.scaleFactors !== [1, 1, 1]) {
            vector = vector.map((x, i) => x / this.scaleFactors[i]);
        }

        mat4.translate(this.modelMatrix, this.modelMatrix, vector);
    }

    scale(vector) {
        // to show the axis based on scale of the selected object
        this.scaleFactors = this.scaleFactors.map((x, i) => x * vector[i]);

        // to keep the axis lengths consistent even after scaling
        if (this.scaleFactors !== [1, 1, 1]) {
            this.axisLengths =
                this.axisLengths
                    .map((x, i) => x / vector[i]);
        }

        mat4.scale(this.modelMatrix, this.modelMatrix, vector);
    }

    static setupAttribute(buffer, location) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.vertexAttribPointer(
            location, // the attribute location
            3, // number of elements for each vertex
            gl.FLOAT, // type of the attributes
            gl.FALSE, // should data be normalised?
            0, // stride
            0 // offset
        );

        // enable the attribute
        gl.enableVertexAttribArray(location);
    }

    renderAxes(global = false) {
        // Determine the multiplier based on the global flag
        const multiplier = global ? 4 : 1;

        // Define axis lines in local coordinates, applying the multiplier
        const axesVertices = [
            -this.axisLengths[0] * multiplier, 0, 0, this.axisLengths[0] * multiplier, 0, 0,   // x-axis line (red)
            0, -this.axisLengths[1] * multiplier, 0, 0, this.axisLengths[1] * multiplier, 0,    // y-axis line (green)
            0, 0, -this.axisLengths[2] * multiplier, 0, 0, this.axisLengths[2] * multiplier    // z-axis line (blue)
        ];

        const axisColors = [
            1, 0, 0, 1, 0, 0,  // red for x-axis
            0, 1, 0, 0, 1, 0,  // green for y-axis
            0, 0, 1, 0, 0, 1   // blue for z-axis
        ];

        // Create and bind buffers for axes
        const axisVerticesBuffer = gl.createBuffer();
        const axisColorBuffer = gl.createBuffer();

        /// send data to buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, axisVerticesBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axesVertices), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, axisColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(axisColors), gl.STATIC_DRAW);

        // Setup attributes for vertices and colors
        Shape.setupAttribute(axisVerticesBuffer, locations.attributes.vertexLocation);
        Shape.setupAttribute(axisColorBuffer, locations.attributes.colorLocation);

        // Apply the shape's model matrix to the axes
        gl.uniformMatrix4fv(locations.uniforms.modelMatrix, false, this.modelMatrix);

        // Draw lines for the axes
        gl.drawArrays(gl.LINES, 0, axesVertices.length / 3);

        // Cleanup
        gl.deleteBuffer(axisVerticesBuffer);
        gl.deleteBuffer(axisColorBuffer);
    }
}
