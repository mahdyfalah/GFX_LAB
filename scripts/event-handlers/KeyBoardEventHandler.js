let selectedShapeIndex = null;
let selectedShapes = [];
const translationSpeed = 0.2;
const rotationAngle = Math.PI / 8;
let isLightTransformMode = false
let rotationMatrix = mat4.create();
const lightRotationAngle = Math.PI / 512;

const movementKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", ",", "."];
const scalingKeys = ["a", "b", "c", "A", "B", "C"];
const rotationKeys = ["i", "k", "o", "u", "l", "j"];
const objectSelectionKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const shaderSelectionKeys = ["w", "e", "r", "t"]
const lightTransformModeKey = "L"
const axisX = [1, 0, 0]
const axisY = [0, 1, 0]
const axisZ = [0, 0, 1]

function handleKeyDownEvents() {
    window.addEventListener("keydown", (event) => {
        if (event.key === "L"){
            isLightTransformMode = !isLightTransformMode
        }

        if (shaderSelectionKeys.includes(event.key)){
            handleShaderSelection(event.key);
        }

        if (isLightTransformMode){
            if (movementKeys.includes(event.key)){
                handleLightTransformations(event.key)
            }else if (rotationKeys.includes(event.key)){
                handleLightRotations(event.key)
            }
        }else {
            if (movementKeys.includes(event.key)) {
                handleTranslationEvent(event.key)
            } else if (objectSelectionKeys.includes(event.key)) {
                handleObjectSelection(event.key);
            }else if (scalingKeys.includes(event.key)) {
                handleRotationEvent(event.key);
            } else if (rotationKeys.includes(event.key)) {
                handleObjectRotation(event.key);
            } else if (event.key === " ") {
                deselectAllShapes()
            }
        }
    })
}

function handleTranslationEvent(key) {
    if (selectedShapeIndex === null) {
        handleViewTranslation(key)
    }else if (selectedShapeIndex === -1){
        handleGroupTranslation(key)
    } else {
        handleObjectTranslation(key)
    }
}

function handleViewTranslation(key) {
    switch (key) {
        case "ArrowLeft":
            // Move camera left, so translate scene right (positive x-axis)
            mat4.translate(viewMatrix, viewMatrix, [translationSpeed, 0, 0]);
            break;
        case "ArrowRight":
            // Move camera right, so translate scene left (negative x-axis)
            mat4.translate(viewMatrix, viewMatrix, [-translationSpeed, 0, 0]);
            break;
        case "ArrowUp":
            // Move camera up, so translate scene down (negative y-axis)
            mat4.translate(viewMatrix, viewMatrix, [0, -translationSpeed, 0]);
            break;
        case "ArrowDown":
            // Move camera down, so translate scene up (positive y-axis)
            mat4.translate(viewMatrix, viewMatrix, [0, translationSpeed, 0]);
            break;
        default:
            break;
    }
}

function handleGroupTranslation(key) {
    switch (key) {
        case "ArrowLeft":
            mat4.translate(viewMatrix, viewMatrix, [-translationSpeed, 0, 0]);
            break;
        case "ArrowRight":
            mat4.translate(viewMatrix, viewMatrix, [translationSpeed, 0, 0]);
            break;
        case "ArrowUp":
            mat4.translate(viewMatrix, viewMatrix, [0, translationSpeed, 0]);
            break;
        case "ArrowDown":
            mat4.translate(viewMatrix, viewMatrix, [0, -translationSpeed, 0]);
            break;
        case ",":
            mat4.translate(viewMatrix, viewMatrix, [0, 0, translationSpeed]);
            break;
        case ".":
            mat4.translate(viewMatrix, viewMatrix, [0, 0, -translationSpeed]);
            break;
        default:
            break;
    }
}

function handleObjectTranslation(key) {
    switch (key) {
        case "ArrowLeft":
            selectedShapes[0].translate([-translationSpeed, 0, 0]);
            break;
        case "ArrowRight":
            selectedShapes[0].translate([translationSpeed, 0, 0]);
            break;
        case "ArrowUp":
            selectedShapes[0].translate([0, translationSpeed, 0]);
            break;
        case "ArrowDown":
            selectedShapes[0].translate([0, -translationSpeed, 0]);
            break;
        case ",":
            selectedShapes[0].translate([0, 0, translationSpeed]);
            break;
        case ".":
            selectedShapes[0].translate([0, 0, -translationSpeed]);
            break;
        default:
            break;
    }
}

function handleRotationEvent(key) {
    if (selectedShapeIndex === -1) {
        handleViewScaling(key)
    } else {
        handleObjectScaling(key)
    }
}

function handleViewScaling(key) {
    switch (key) {
        case "a":
            mat4.scale(viewMatrix, viewMatrix, [0.9, 1, 1]);
            break;
        case "A":
            mat4.scale(viewMatrix, viewMatrix, [1.1, 1, 1]);
            break;
        case "b":
            mat4.scale(viewMatrix, viewMatrix, [1, 0.9, 1]);
            break;
        case "B":
            mat4.scale(viewMatrix, viewMatrix, [1, 1.1, 1]);
            break;
        case "c":
            mat4.scale(viewMatrix, viewMatrix, [1, 1, 0.9]);
            break;
        case "C":
            mat4.scale(viewMatrix, viewMatrix, [1, 1, 1.1]);
            break;
        default:
            break;
    }
}

function handleObjectScaling(key) {
    switch (key) {
        case "a":
            selectedShapes.forEach(shape => {
                shape.scale([0.9, 1, 1]);
            })
            break;
        case "A":
            selectedShapes.forEach(shape => {
                shape.scale([1.1, 1, 1]);
            })
            break;
        case "b":
            selectedShapes.forEach(shape => {
                shape.scale([1, 0.9, 1]);
            })
            break;
        case "B":
            selectedShapes.forEach(shape => {
                shape.scale([1, 1.1, 1]);
            })
            break;
        case "c":
            selectedShapes.forEach(shape => {
                shape.scale([1, 1, 0.9]);
            })
            break;
        case "C":
            selectedShapes.forEach(shape => {
                shape.scale([1, 1, 1.1]);
            })
            break;
        default:
            break;
    }
}

function handleObjectRotation(key) {
    switch (key) {
        case "i":
            selectedShapes
                .forEach(shape => {
                    shape.rotate(
                        -rotationAngle,
                        axisX,
                        selectedShapeIndex === -1)
                })
            break;
        case "k":
            selectedShapes
                .forEach(shape => {
                    shape.rotate(
                        rotationAngle,
                        axisX,
                        selectedShapeIndex === -1)
                })
            break;
        case "o":
            selectedShapes
                .forEach(shape => {
                    shape.rotate(
                        rotationAngle,
                        axisY,
                        selectedShapeIndex === -1)
                })
            break;
        case "u":
            selectedShapes
                .forEach(shape => {
                    shape.rotate(
                        -rotationAngle,
                        axisY,
                        selectedShapeIndex === -1)
                })
            break;
        case "l":
            selectedShapes
                .forEach(shape => {
                    shape.rotate(
                        -rotationAngle,
                        axisZ,
                        selectedShapeIndex === -1)
                })
            break;
        case "j":
            selectedShapes
                .forEach(shape => {
                    shape.rotate(
                        rotationAngle,
                        axisZ,
                        selectedShapeIndex === -1)
                })
            break;
        default:
            break;
    }
}

function handleObjectSelection(key) {
    selectedShapeIndex = parseInt(key) - 1;
    if (selectedShapeIndex !== -1) {
        selectedShapes = [shapes[selectedShapeIndex]];
    } else {
        selectedShapes = shapes;
    }
}

function handleShaderSelection(key) {
    switch (key) {
        case "w":
            setActiveShader("gouraudDiffuse");
            break;
        case "e":
            setActiveShader("gouraudSpecular");
            break;
        case "r":
            setActiveShader("phongDiffuse");
            break;
        case "t":
            setActiveShader("phongSpecular");
            break;
        default:
            break;
    }
}

function handleLightTransformations(key) {
    switch (key) {
        case 'ArrowLeft':
            vec4.add(lightPosition, lightPosition, vec4.fromValues(-translationSpeed, 0, 0, 0));
            break;
        case 'ArrowRight':
            vec4.add(lightPosition, lightPosition, vec4.fromValues(translationSpeed, 0, 0, 0));
            break;
        case 'ArrowUp':
            vec4.add(lightPosition, lightPosition, vec4.fromValues(0, translationSpeed, 0, 0));
            break;
        case 'ArrowDown':
            vec4.add(lightPosition, lightPosition, vec4.fromValues(0, -translationSpeed, 0, 0));
            break;
        case ",":
            vec4.add(lightPosition, lightPosition, vec4.fromValues(0, 0, translationSpeed, 0));
            break;
        case ".":
            vec4.add(lightPosition, lightPosition, vec4.fromValues(0, 0, -translationSpeed, 0));
            break;
        default:
            break;
    }
}

function handleLightRotations(key){
    switch (key) {
        case "i":
            mat4.rotate(rotationMatrix, rotationMatrix, -lightRotationAngle, axisX);
            vec4.transformMat4(lightPosition, lightPosition, rotationMatrix);
            break;
        case "k":
            mat4.rotate(rotationMatrix, rotationMatrix, lightRotationAngle, axisX);
            vec4.transformMat4(lightPosition, lightPosition, rotationMatrix);
            break;
        case "o":
            mat4.rotate(rotationMatrix, rotationMatrix, lightRotationAngle, axisY);
            vec4.transformMat4(lightPosition, lightPosition, rotationMatrix);
            break;
        case "u":
            mat4.rotate(rotationMatrix, rotationMatrix, -lightRotationAngle, axisY);
            vec4.transformMat4(lightPosition, lightPosition, rotationMatrix);
            break;
        case "l":
            mat4.rotate(rotationMatrix, rotationMatrix, -lightRotationAngle, axisZ);
            vec4.transformMat4(lightPosition, lightPosition, rotationMatrix);
            break;
        case "j":
            mat4.rotate(rotationMatrix, rotationMatrix, lightRotationAngle, axisZ);
            vec4.transformMat4(lightPosition, lightPosition, rotationMatrix);
            break;
        default:
            break;
    }
}


function deselectAllShapes() {
    selectedShapeIndex = null;
    selectedShapes = [];
}