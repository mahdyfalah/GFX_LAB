function handleMouseEvents() {
    let isDragging = false;
    let lastMousePosition = { x: 0, y: 0 };

    window.addEventListener("mousedown", (event) => {
        isDragging = true;
        lastMousePosition = { x: event.clientX, y: event.clientY };
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    window.addEventListener("mousemove", (event) => {
        if (isDragging) {
            // Calculate delta movement
            const deltaX = event.clientX - lastMousePosition.x;
            const deltaY = event.clientY - lastMousePosition.y;
            lastMousePosition = { x: event.clientX, y: event.clientY };

            // Adjust translation speed
            const translationSpeed = 0.005;
            const translationVector = [
                deltaX * translationSpeed,
                -deltaY * translationSpeed, // Invert Y for natural movement
                0
            ];

            // Apply translation to the viewMatrix
            mat4.translate(viewMatrix, viewMatrix, translationVector);
        }
    });
}