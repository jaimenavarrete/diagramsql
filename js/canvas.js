// CANVAS
const canvas = document.getElementById('canvas');
const canvasStyles = window.getComputedStyle(canvas);

const getPropertyValueAsNumber = (propertyName) => 
    Number(canvasStyles.getPropertyValue(propertyName).replace('px', ''))

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
    canvas.style.left = initialX + 'px';
    canvas.style.marginLeft = (-1 * initialWidth * (zoomPercentage / 100) / 2) + 'px';
    canvas.style.top = initialY + 'px';
    canvas.style.marginTop = (-1 * initialHeight * (zoomPercentage / 100) / 2) + 'px';
}

const modifyCanvasGridSize = () => {
    const newGridSize = initialGridSize * zoomPercentage / 100;
    const newSubGridSize = initialSubGridSize * zoomPercentage / 100;

    canvas.style.setProperty("--grid-size", newGridSize + "px");
    canvas.style.setProperty("--sub-grid-size", newSubGridSize + "px");
    canvas.style.width = Math.round(initialWidth * zoomPercentage / 100) + "px";
    canvas.style.height = Math.round(initialHeight * zoomPercentage / 100) + "px";

    // Change percentage in reset button
    btnResetZoom.textContent = zoomPercentage + '%';
}

const increaseCanvasGridSize = (e) => {
    e.preventDefault();

    if(zoomPercentage >= 200) return;

    zoomPercentage += 10;
    modifyCanvasGridSize();
}

const decreaseCanvasGridSize = (e) => {
    e.preventDefault();

    if(zoomPercentage <= 50) return;

    zoomPercentage -= 10;
    modifyCanvasGridSize();
}

const resetCanvasGridSize = (e) => {
    e.preventDefault();

    zoomPercentage = 100;
    modifyCanvasGridSize();
}

const changeCanvasGridSizeMouseWheel = (e) => {
    if(e.deltaY < 0) {
        increaseCanvasGridSize(e);
        return
    }

    decreaseCanvasGridSize(e);
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

    if(!canvas.style.left || !canvas.style.top) {
        canvas.style.left = initialX + 'px';
        canvas.style.top = initialY + 'px';
    }

    canvas.style.left = (Number(canvas.style.left.replace('px', '')) + e.movementX) + 'px';
    canvas.style.top = (Number(canvas.style.top.replace('px', '')) + e.movementY) + 'px';
}

// Zoom events
btnResetPosition.addEventListener('click', resetCanvasPosition);
btnIncreaseZoom.addEventListener('click', increaseCanvasGridSize);
btnDecreaseZoom.addEventListener('click', decreaseCanvasGridSize);
btnResetZoom.addEventListener('click', resetCanvasGridSize);
canvas.addEventListener('wheel', changeCanvasGridSizeMouseWheel);

// Drag and drop events
document.addEventListener('keydown', activateSpecialKey);
document.addEventListener('keyup', deactivateSpecialKey);
canvas.addEventListener('mousedown', () => isCanvasDragged = isSpecialKeyPressed);
canvas.addEventListener('mouseup', () => isCanvasDragged = false);
canvas.addEventListener('mousemove', moveCanvas);