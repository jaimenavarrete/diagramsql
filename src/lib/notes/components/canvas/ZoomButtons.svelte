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

<div class="zoom-buttons">
    <button
        id="reset-position-button"
        on:click={resetCanvasPosition}
        class:active={isResetButtonActive}>&#9872;</button
    >
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

<style>
    .zoom-buttons {
        position: absolute;
        right: 1.5rem;
        bottom: 1.5rem;
        -webkit-user-select: none;
        user-select: none;
    }

    .zoom-buttons button {
        background: white;
        border: 1px solid #4752c7;
        border-radius: 5px;
        color: #4752c7;
        cursor: pointer;
        font-size: 25px;
        font-weight: bold;
        margin: 0 2px;
        padding: 5px 15px;
        vertical-align: middle;
    }

    .zoom-buttons button:hover {
        background-color: #4752c7;
        color: #f2f2f2;
    }

    .zoom-buttons #reset-position-button {
        cursor: default;
        opacity: 0;
        transition: all 0.2s ease-out;
    }

    .zoom-buttons #reset-position-button:is(.active) {
        cursor: pointer;
        opacity: 1;
    }

    .zoom-buttons #reset-zoom-button {
        font-size: 20px;
        padding: 8px 15px;
    }
</style>
