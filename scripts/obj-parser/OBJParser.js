/*
*   source :  https://webglfundamentals.org/webgl/lessons/webgl-load-obj.html
*/
function parseOBJ(text) {
    const objPositions = [[0, 0, 0]];
    const webglVertexData = []; // Only for positions

    function addVertex(vert) {
        const index = parseInt(vert.split('/')[0], 10);
        if (index) {
            const adjustedIndex = index >= 0 ? index : objPositions.length + index;
            webglVertexData.push(...objPositions[adjustedIndex]);
        }
    }

    const lines = text.split('\n');
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith('#')) continue;

        const [keyword, ...parts] = trimmedLine.split(/\s+/);
        const floatParts = parts.map(parseFloat);

        switch (keyword) {
            case 'v':
                objPositions.push(floatParts);
                break;
            case 'f':
                for (let i = 1; i < parts.length - 1; i++) {
                    addVertex(parts[0]);
                    addVertex(parts[i]);
                    addVertex(parts[i + 1]);
                }
                break;
        }
    }

    return {
        position: webglVertexData,
    };
}


async function loadOBJ(url) {
    const data = await fetch(url).then(res => res.text());

    return parseOBJ(data)
}