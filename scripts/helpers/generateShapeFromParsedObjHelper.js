function generateShape(parsedObj) {
    const { position, normal } = parsedObj;

    const colors = [];
    const numVertices = position.length / 3;
    for (let i = 0; i < numVertices; i++) {
        colors.push([96/255, 130/255, 182/255]);
    }

    const shape = new Shape();
    shape.initData(position, colors, normal);

    return shape;
}
