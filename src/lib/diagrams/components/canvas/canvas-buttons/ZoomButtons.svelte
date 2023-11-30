<script>
    import {
        IconPlus,
        IconMinus,
        IconGrid4x4,
        IconCurrentLocation,
    } from '@tabler/icons-svelte';

    // Props
    export let canvasInfo;

    // States
    let isResetButtonActive = false;

    // Export to parent
    export let isGridActive = true;

    // Utility functions
    export const showResetPositionButton = () => {
        const initialTop = canvasInfo.containerHeight / 2;
        const initialLeft = canvasInfo.containerWidth / 2;

        const isOffScreenY = Math.abs(canvasInfo.top - initialTop) > initialTop;
        const isOffScreenX =
            Math.abs(canvasInfo.left - initialLeft) > initialLeft;

        if (isOffScreenY || isOffScreenX) {
            isResetButtonActive = true;
            return;
        }

        isResetButtonActive = false;
    };

    // Event Handlers

    const resetCanvasPosition = () => {
        if (!isResetButtonActive) return;

        canvasInfo.top = canvasInfo.containerHeight / 2;
        canvasInfo.left = canvasInfo.containerWidth / 2;

        isResetButtonActive = false;
    };

    const increaseCanvasZoom = () => {
        if (canvasInfo.zoomRatio >= 2.5) return;
        canvasInfo.zoomRatio += 0.1;
    };

    const decreaseCanvasZoom = () => {
        if (canvasInfo.zoomRatio <= 0.2) return;
        canvasInfo.zoomRatio -= 0.1;
    };

    const resetCanvasZoom = () => {
        canvasInfo.zoomRatio = 1;
    };

    export const changeCanvasZoomMouseWheel = (e) => {
        return e.deltaY < 0 ? increaseCanvasZoom() : decreaseCanvasZoom();
    };
</script>

<section class="canvas-buttons">
    <div
        class="buttons-container reset-position-button"
        class:active={isResetButtonActive}
    >
        <button on:click={resetCanvasPosition} title="Go to center"
            ><IconCurrentLocation size={20} /></button
        >
    </div>
    <div class="buttons-container">
        <button
            on:click={() => (isGridActive = !isGridActive)}
            class="show-grid-button"
            title={isGridActive ? 'Hide grid' : 'Show grid'}
            ><IconGrid4x4 size={20} /></button
        >
    </div>
    <div class="buttons-container">
        <button
            on:click={decreaseCanvasZoom}
            class="decrease-zoom-button"
            title="Decrease zoom"><IconMinus size={20} /></button
        >
        <button
            on:click={resetCanvasZoom}
            class="reset-zoom-button"
            title="Reset zoom">{Math.round(canvasInfo.zoomRatio * 100)}%</button
        >
        <button
            on:click={increaseCanvasZoom}
            class="increase-zoom-button"
            title="Increase zoom"
            ><IconPlus size={20} />
        </button>
    </div>
</section>

<style>
    .canvas-buttons {
        position: absolute;
        right: 1rem;
        bottom: 1rem;
    }

    .canvas-buttons .reset-position-button {
        cursor: default;
        opacity: 0;
        transition: all 0.1s ease-out;
    }

    .canvas-buttons .reset-position-button:is(.active) {
        cursor: pointer;
        opacity: 1;
    }

    .canvas-buttons .reset-zoom-button {
        font-size: 15px;
    }
</style>
