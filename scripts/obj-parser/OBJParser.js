/*
*   source :  https://webglfundamentals.org/webgl/lessons/webgl-load-obj.html
*/
let objPositions;
let vertexData;

function addVertex(vertex) {
    const index = parseInt(vertex.split('/')[0], 10);

    // add the position to the vertexData by index
    vertexData.push(...objPositions[index]);
}
function parseOBJ(text) {
    objPositions = [[0, 0, 0]];
    vertexData = [];

    // split each line to array of strings
    const lines = text.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();

        // skip empty and comment lines
        if (!trimmedLine || trimmedLine.startsWith('#')) continue;

        // separate the keyword and the numbers
        const [keyword, ...parts] = trimmedLine.split(/\s+/);

        // to-do: extract vt & vn as well
        switch (keyword) {
            case 'v':
                objPositions.push(parts.map(parseFloat));
                break;
            case 'f':
                parts.forEach(part => {
                    addVertex(part);
                })
                break;
        }
    }

    return {
        position: vertexData,
    };
}

async function loadOBJ(url) {
    const data = await fetch(url).then(res => res.text());

    return parseOBJ(data)
}