let selectedShapeIndex = null;
let selectedShapes = [];
const translationSpeed = 0.2;
const rotationAngle = Math.PI / 8;

const movementKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", ",", "."];
const scalingKeys = ["a", "b", "c", "A", "B", "C"];
const rotationKeys = ["i", "k", "o", "u", "l", "j"];
const numberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const axisX = [1, 0, 0]
const axisY = [0, 1, 0]
const axisZ = [0, 0, 1]

function handleKeyDownEvents() {
    window.addEventListener("keydown", (event) => {
        if (movementKeys.includes(event.key)) {
            handleArrowKeyEvent(event.key)
        } else if (numberKeys.includes(event.key)) {
            handleObjectSelection(event.key);
        } else if (scalingKeys.includes(event.key)) {
            handleObjectScaling(event.key);
        } else if (rotationKeys.includes(event.key)) {
            handleObjectRotation(event.key);
        } else if (event.key === " ") {
            deselectAllShapes()
        }
    })
}

function handleArrowKeyEvent(key) {
    if (selectedShapeIndex === null) {
        handleViewTranslation(key)
    } else {
        handleObjectMovement(key)
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

function handleObjectMovement(key) {
    switch (key) {
        case "ArrowLeft":
            selectedShapes.forEach(shape => {
                shape.translate([-translationSpeed, 0, 0]);
            })
            break;
        case "ArrowRight":
            selectedShapes.forEach(shape => {
                shape.translate([translationSpeed, 0, 0]);
            })
            break;
        case "ArrowUp":
            selectedShapes.forEach(shape => {
                shape.translate([0, translationSpeed, 0]);
            })
            break;
        case "ArrowDown":
            selectedShapes.forEach(shape => {
                shape.translate([0, -translationSpeed, 0]);
            })
            break;
        case ",":
            selectedShapes.forEach(shape => {
                shape.translate([0, 0, translationSpeed]);
            })
            break;
        case ".":
            selectedShapes.forEach(shape => {
                shape.translate([0, 0, -translationSpeed]);
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

function deselectAllShapes() {
    selectedShapeIndex = null;
    selectedShapes = [];
}