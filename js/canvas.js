// CANVAS
const canvas = document.getElementById('canvas');
const canvasGridLayer = document.getElementById('canvas-grid-layer');
const canvasGridLayerStyles = window.getComputedStyle(canvasGridLayer);

const getPropertyValueAsNumber = (propertyName) => 
    Number(canvasGridLayerStyles.getPropertyValue(propertyName).replace('px', ''))

// Initial canvas styles values
const initialGridSize = getPropertyValueAsNumber('--grid-size');
const initialSubGridSize = getPropertyValueAsNumber('--sub-grid-size');
const initialWidth = getPropertyValueAsNumber('width');
const initialHeight = getPropertyValueAsNumber('height');
const initialX = getPropertyValueAsNumber('left');
const initialY = getPropertyValueAsNumber('top');

// Zoom buttons
const btnResetPosition = document.getElementById('reset-position-button');
const btnIncreaseZoom = document.getElementById('increase-zoom-button');
const btnDecreaseZoom = document.getElementById('decrease-zoom-button');
const btnResetZoom = document.getElementById('reset-zoom-button');
let zoomPercentage = 100;

// Drag Canvas
const specialKey = ' ';
let isSpecialKeyPressed = false;
let isCanvasDragged = false;

const resetCanvasPosition = () => {
    // Scaled elements do not change width or height, so is not necessary to modify margins
    canvas.style.left = initialX + 'px';
    canvas.style.top = initialY + 'px';

    canvasGridLayer.style.left = initialX + 'px';
    canvasGridLayer.style.marginLeft = (-1 * initialWidth * (zoomPercentage / 100) / 2) + 'px';
    canvasGridLayer.style.top = initialY + 'px';
    canvasGridLayer.style.marginTop = (-1 * initialHeight * (zoomPercentage / 100) / 2) + 'px';
}

const modifyCanvasSize = () => {
    canvas.style.transform = `scale(${ zoomPercentage / 100 })`;

    // Change percentage in reset button
    btnResetZoom.textContent = zoomPercentage + '%';
}

const modifyCanvasGridSize = () => {
    const newGridSize = initialGridSize * zoomPercentage / 100;
    const newSubGridSize = initialSubGridSize * zoomPercentage / 100;

    canvasGridLayer.style.setProperty("--grid-size", newGridSize + "px");
    canvasGridLayer.style.setProperty("--sub-grid-size", newSubGridSize + "px");

    // The size of the grid is modified to match the size of the scaled canvas
    canvasGridLayer.style.width = initialWidth * zoomPercentage / 100 + "px";
    canvasGridLayer.style.height = initialHeight * zoomPercentage / 100 + "px";

    // The margins of the grid are modified to match the position of the scaled canvas
    canvasGridLayer.style.marginLeft = (-1 * initialWidth * (zoomPercentage / 100) / 2) + 'px';
    canvasGridLayer.style.marginTop = (-1 * initialHeight * (zoomPercentage / 100) / 2) + 'px';
}

const increaseCanvasZoom = (e) => {
    e.preventDefault();

    if(zoomPercentage >= 200) return;

    zoomPercentage += 10;

    modifyCanvasSize()
    modifyCanvasGridSize();
}

const decreaseCanvasZoom = (e) => {
    e.preventDefault();

    if(zoomPercentage <= 50) return;

    zoomPercentage -= 10;

    modifyCanvasSize();
    modifyCanvasGridSize();
}

const resetCanvasGridSize = (e) => {
    e.preventDefault();

    zoomPercentage = 100;

    modifyCanvasSize();
    modifyCanvasGridSize();
}

const changeCanvasGridSizeMouseWheel = (e) => {
    if(e.deltaY < 0) {
        increaseCanvasZoom(e);
        return
    }

    decreaseCanvasZoom(e);
}

const activateSpecialKey = (e) => {
    if(e.key !== specialKey || isSpecialKeyPressed) return;

    // Change cursor type
    canvas.style.cursor = 'grab';
    isSpecialKeyPressed = true;
}

const deactivateSpecialKey = (e) => {
    if(e.key !== specialKey || !isSpecialKeyPressed) return;

    // Change cursor type
    canvas.style.cursor = 'default';
    isSpecialKeyPressed = false;
}

const moveCanvas = (e) => {
    if(!isSpecialKeyPressed || !isCanvasDragged) return;

    if(!canvas.style.left) {
        canvas.style.left = initialX + 'px';
        canvas.style.top = initialY + 'px';

        canvasGridLayer.style.left = initialX + 'px';
        canvasGridLayer.style.top = initialY + 'px';
    }

    canvas.style.left = (Number(canvas.style.left.replace('px', '')) + e.movementX) + 'px';
    canvas.style.top = (Number(canvas.style.top.replace('px', '')) + e.movementY) + 'px';

    canvasGridLayer.style.left = canvas.style.left;
    canvasGridLayer.style.top = canvas.style.top;
}

// Zoom events
btnResetPosition.addEventListener('click', resetCanvasPosition);
btnIncreaseZoom.addEventListener('click', increaseCanvasZoom);
btnDecreaseZoom.addEventListener('click', decreaseCanvasZoom);
btnResetZoom.addEventListener('click', resetCanvasGridSize);
canvas.addEventListener('wheel', changeCanvasGridSizeMouseWheel);

// Drag and drop events
document.addEventListener('keydown', activateSpecialKey);
document.addEventListener('keyup', deactivateSpecialKey);
canvas.addEventListener('mousedown', () => isCanvasDragged = isSpecialKeyPressed);
canvas.addEventListener('mouseup', () => isCanvasDragged = false);
canvas.addEventListener('mousemove', moveCanvas);