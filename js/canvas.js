// CANVAS
const canvas = document.getElementById('canvas');
const canvasContainer = document.getElementById('canvas-container');
const canvasContainerStyles = window.getComputedStyle(canvasContainer);
const canvasGridLayer = document.getElementById('canvas-grid-layer');
const canvasGridLayerStyles = window.getComputedStyle(canvasGridLayer);

const getPropertyValueAsNumber = (propertyName) => 
    parseFloat(canvasGridLayerStyles.getPropertyValue(propertyName))

// Initial canvas styles values
const initialGridSize = getPropertyValueAsNumber('--grid-size');
const initialSubGridSize = getPropertyValueAsNumber('--sub-grid-size');
const initialWidth = getPropertyValueAsNumber('width');
const initialHeight = getPropertyValueAsNumber('height');
const initialX = getPropertyValueAsNumber('left');
const initialY = getPropertyValueAsNumber('top');

// Initial canvas container styles values
const containerInitialWidth = parseFloat(canvasContainerStyles.getPropertyValue('width'));
const containerInitialHeight = parseFloat(canvasContainerStyles.getPropertyValue('height'));

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

// Drag notes
let noteInitialDragPositionX = 0;
let noteInitialDragPositionY = 0;

const showResetPositionButton = (currentPositionX, currentPositionY) => {
    const isOffTheScreenX = Math.abs(initialX - currentPositionX) > containerInitialWidth / 2;
    const isOffTheScreenY = Math.abs(initialY - currentPositionY) > containerInitialHeight / 2;
    
    if(isOffTheScreenX || isOffTheScreenY) {
        btnResetPosition.classList.add('active');
        return;
    }
    
    btnResetPosition.classList.remove('active');
}

const resetCanvasPosition = () => {
    if(!btnResetPosition.classList.contains('active')) return;

    // Scaled elements do not change width or height, so is not necessary to modify margins
    canvas.style.left = initialX + 'px';
    canvas.style.top = initialY + 'px';

    canvasGridLayer.style.left = initialX + 'px';
    canvasGridLayer.style.marginLeft = (-1 * initialWidth * (zoomPercentage / 100) / 2) + 'px';
    canvasGridLayer.style.top = initialY + 'px';
    canvasGridLayer.style.marginTop = (-1 * initialHeight * (zoomPercentage / 100) / 2) + 'px';

    // Hide button
    btnResetPosition.classList.remove('active');
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
    isCanvasDragged = false;
}

const moveCanvas = (e) => {
    if(!isSpecialKeyPressed || !isCanvasDragged) return;

    if(!canvas.style.left) {
        canvas.style.left = initialX + 'px';
        canvas.style.top = initialY + 'px';

        canvasGridLayer.style.left = initialX + 'px';
        canvasGridLayer.style.top = initialY + 'px';
    }

    const currentPositionX = parseFloat(canvas.style.left);
    const currentPositionY = parseFloat(canvas.style.top);

    canvas.style.left = (currentPositionX + e.movementX) + 'px';
    canvas.style.top = (currentPositionY + e.movementY) + 'px';

    canvasGridLayer.style.left = canvas.style.left;
    canvasGridLayer.style.top = canvas.style.top;

    showResetPositionButton(currentPositionX, currentPositionY);
}

const startDraggingNote = (e) => {
    e.target.classList.add('dragged-note');

    noteInitialDragPositionX = e.offsetX < 0 ? 0 : e.offsetX;
    noteInitialDragPositionY = e.offsetY < 0 ? 0 : e.offsetY;
}

const finishDraggingNote = (e) => {
    const draggedNote = e.target;
    
    const notePositionX = draggedNote.offsetLeft;
    const notePositionY = draggedNote.offsetTop;

    draggedNote.style.left = (notePositionX + e.offsetX - noteInitialDragPositionX) + 'px';
    draggedNote.style.top = (notePositionY + e.offsetY - noteInitialDragPositionY) + 'px';

    draggedNote.classList.remove('dragged-note');
}

// Zoom events
btnResetPosition.addEventListener('click', resetCanvasPosition);
btnIncreaseZoom.addEventListener('click', increaseCanvasZoom);
btnDecreaseZoom.addEventListener('click', decreaseCanvasZoom);
btnResetZoom.addEventListener('click', resetCanvasGridSize);
canvas.addEventListener('wheel', changeCanvasGridSizeMouseWheel);

// Drag and drop canvas events
document.addEventListener('keydown', activateSpecialKey);
document.addEventListener('keyup', deactivateSpecialKey);
canvas.addEventListener('mousedown', () => isCanvasDragged = isSpecialKeyPressed);
canvas.addEventListener('mouseup', () => isCanvasDragged = false);
canvas.addEventListener('mousemove', moveCanvas);

// Drag and drop notes events
canvas.addEventListener('dragstart', startDraggingNote)
canvas.addEventListener('dragend', finishDraggingNote)