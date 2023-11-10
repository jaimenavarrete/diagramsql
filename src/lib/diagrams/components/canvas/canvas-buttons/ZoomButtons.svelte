<script>
    import {
        IconPlus,
        IconMinus,
        IconGrid4x4,
        IconCurrentLocation,
    } from '@tabler/icons-svelte';

    // Props

    export let zoomRatio;
    export let canvasTop;
    export let canvasLeft;
    export let getContainerStyle;

    // States
    let isResetButtonActive = false;

    // Export to parent
    export let isGridActive = true;

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
            title="Reset zoom">{Math.round(zoomRatio * 100)}%</button
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
        right: 1.5rem;
        bottom: 1.5rem;
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
        font-size: 16px;
    }
</style>
