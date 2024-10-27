async function loadOBJ(url) {
    const data = await fetch(url).then(res => res.text());
    return OBJParser(data)
}