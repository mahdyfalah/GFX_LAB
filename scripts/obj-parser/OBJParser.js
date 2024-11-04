/*
*   source :  https://webglfundamentals.org/webgl/lessons/webgl-load-obj.html
*/
let objPositions;
let objNormals;
let vertexData;

function addVertex(vertex) {
    const ptn = vertex.split('/');

    ptn.forEach((objIndexStr, i) => {
        if (!objIndexStr) {
            return;
        }
        const objIndex = parseInt(objIndexStr);

        // objPosition
        if (i === 0) {
            const index = objIndex + (objIndex >= 0 ? 0 : objPositions.length);
            vertexData[0].push(...objPositions[index])
        }

        // objNormal
        if (i === 2) {
            const index = objIndex + (objIndex >= 0 ? 0 : objNormals.length);
            vertexData[1].push(...objNormals[index]);
        }
    });
}

function parseOBJ(text) {
    objPositions = [[0, 0, 0]];
    objNormals = [[0, 0, 0]];
    vertexData = [[], []];

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
            case 'vn':
                objNormals.push(parts.map(parseFloat));
                break;
            case 'f':
                parts.forEach(part => {
                    addVertex(part);
                })
                break;
        }
    }

    return {
        position: vertexData[0],
        normal: vertexData[1],
    };
}

async function loadOBJ(url) {
    const data = await fetch(url).then(res => res.text());

    return parseOBJ(data)
}