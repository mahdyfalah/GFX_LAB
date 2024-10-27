function generateShape(parsedObj) {
    const { position } = parsedObj;

    const colors = [];
    const numVertices = position.length / 3;
    for (let i = 0; i < numVertices; i++) {
        colors.push([Math.random(), Math.random(), Math.random()]);
    }

    const shape = new Shape();
    shape.initData(position, colors);

    return shape;
}