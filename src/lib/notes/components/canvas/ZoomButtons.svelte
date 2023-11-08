<script>
    export let zoomRatio;
    export let canvasTop;
    export let canvasLeft;
    export let getContainerStyle;

    let isResetButtonActive = false;

    // Utility functions
    export const showResetPositionButton = () => {
        const initialTop = getContainerStyle('height') / 2;
        const initialLeft = getContainerStyle('width') / 2;

        const isOffScreenY = Math.abs(canvasTop - initialTop) > initialTop;
        const isOffScreenX = Math.abs(canvasLeft - initialLeft) > initialLeft;

        if (isOffScreenY || isOffScreenX) {
            isResetButtonActive = true;
            return;
        }

        isResetButtonActive = false;
    };

    // Event Handlers

    const resetCanvasPosition = () => {
        if (!isResetButtonActive) return;

        canvasTop = getContainerStyle('height') / 2;
        canvasLeft = getContainerStyle('width') / 2;

        isResetButtonActive = false;
    };

    const increaseCanvasZoom = () => {
        if (zoomRatio >= 2) return;
        zoomRatio += 0.1;
    };

    const decreaseCanvasZoom = () => {
        if (zoomRatio <= 0.5) return;
        zoomRatio -= 0.1;
    };

    const resetCanvasZoom = () => {
        if (zoomRatio >= 2) return;
        zoomRatio = 1;
    };

    export const changeCanvasZoomMouseWheel = (e) => {
        return e.deltaY < 0 ? increaseCanvasZoom() : decreaseCanvasZoom();
    };
</script>

<section class="canvas-buttons">
    <button
        id="reset-position-button"
        on:click={resetCanvasPosition}
        class:active={isResetButtonActive}>&#9872;</button
    >
    <div class="zoom-buttons">
        <button id="increase-zoom-button" on:click={increaseCanvasZoom}
            >&plus;</button
        >
        <button id="reset-zoom-button" on:click={resetCanvasZoom}
            >{Math.round(zoomRatio * 100)}%</button
        >
        <button id="decrease-zoom-button" on:click={decreaseCanvasZoom}
            >&dash;</button
        >
    </div>
</section>

<style>
    .canvas-buttons {
        display: flex;
        position: absolute;
        right: 1.5rem;
        bottom: 1.5rem;
        -webkit-user-select: none;
        user-select: none;
    }

    .canvas-buttons button {
        background: white;
        border: none;
        border-radius: 5px;
        color: #4752c7;
        cursor: pointer;
        font-size: 25px;
        font-weight: bold;
        margin: 0 10px;
        padding: 3px 15px;
        transition: all 0.2s ease-out;
    }

    .canvas-buttons button:hover {
        background-color: #4752c7;
        color: #fff;
    }

    .canvas-buttons #reset-position-button {
        box-shadow: 0 0 2px #7c7c7c;
        cursor: default;
        opacity: 0;
    }

    .canvas-buttons #reset-position-button:is(.active) {
        cursor: pointer;
        opacity: 1;
    }

    .canvas-buttons #reset-zoom-button {
        font-size: 16px;
    }

    .zoom-buttons {
        background: white;
        border-radius: 5px;
        box-shadow: 0 0 2px #7c7c7c;
        padding: 3px;
        display: flex;
    }

    .zoom-buttons button {
        margin: 0;
    }
</style>
