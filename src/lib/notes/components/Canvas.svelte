<script>
    import Note from './Note.svelte';

    export let notes = [];

    // Canvas interaction
    let specialKey = ' ';

    // Element references
    let containerRef;

    // States
    let zoomRatio = 1,
        canvasHeight = 3500,
        canvasWidth = 6000,
        canvasTop,
        canvasLeft,
        isResetButtonActive = false,
        isSpecialKeyPressed = false,
        isCanvasGrabbed = false;

    // Reactive variables
    $: gridHeight = canvasHeight * zoomRatio;
    $: gridWidth = canvasWidth * zoomRatio;
    $: gridSize = 60 * zoomRatio;
    $: subGridSize = 12 * zoomRatio;
    $: gridMarginTop = (-1 * gridHeight) / 2;
    $: gridMarginLeft = (-1 * gridWidth) / 2;
    $: containerStyles = containerRef
        ? window.getComputedStyle(containerRef)
        : null;

    // Utility functions
    const getContainerStyle = (propertyName) =>
        parseFloat(containerStyles.getPropertyValue(propertyName));

    // Event Handlers
    const resetCanvasPosition = () => {
        if (!isResetButtonActive) return;

        canvasTop = getContainerStyle('height') / 2;
        canvasLeft = getContainerStyle('width') / 2;

        isResetButtonActive = false;
    };

    const activateSpecialKey = (e) => {
        if (e.key !== specialKey || isSpecialKeyPressed) return;

        isSpecialKeyPressed = true;
    };

    const deactivateSpecialKey = (e) => {
        if (e.key !== specialKey || !isSpecialKeyPressed) return;

        isSpecialKeyPressed = false;
        isCanvasGrabbed = false;
    };

    const moveCanvas = (e) => {
        if (!isSpecialKeyPressed || !isCanvasGrabbed) return;

        if (!canvasTop) {
            canvasTop = getContainerStyle('height') / 2;
            canvasLeft = getContainerStyle('width') / 2;
        }

        canvasTop += e.movementY;
        canvasLeft += e.movementX;
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

    const changeCanvasZoomMouseWheel = (e) => {
        return e.deltaY < 0 ? increaseCanvasZoom() : decreaseCanvasZoom();
    };
</script>

<div id="canvas-container" bind:this={containerRef} class="canvas-container">
    <div
        id="canvas-grid-layer"
        style:--grid-size={`${gridSize}px`}
        style:--sub-grid-size={`${subGridSize}px`}
        style:top={canvasTop ? `${canvasTop}px` : null}
        style:left={canvasLeft ? `${canvasLeft}px` : null}
        style:width="{gridWidth}px"
        style:height="{gridHeight}px"
        style:margin-top="{gridMarginTop}px"
        style:margin-left="{gridMarginLeft}px"
    />
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        id="canvas"
        on:mousedown={() => (isCanvasGrabbed = isSpecialKeyPressed)}
        on:mouseup={() => (isCanvasGrabbed = false)}
        on:mousemove={moveCanvas}
        on:wheel={changeCanvasZoomMouseWheel}
        style:transform={`scale(${zoomRatio})`}
        style:top={canvasTop ? `${canvasTop}px` : null}
        style:left={canvasLeft ? `${canvasLeft}px` : null}
        style:cursor={isSpecialKeyPressed ? 'grab' : 'default'}
    >
        {#each notes as note}
            <Note bind:note {canvasHeight} {canvasWidth} {zoomRatio} />
        {/each}
    </div>

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
</div>

<!-- Document reference -->
<svelte:document
    on:keydown={activateSpecialKey}
    on:keyup={deactivateSpecialKey}
/>

<style>
    /* CANVAS BUTTONS STYLES */

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

    /* CANVAS STYLES */

    .canvas-container {
        background-color: #fcfcfc;
        height: 100vh;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .canvas-container #canvas {
        box-shadow: 0 0 3px #7c7c7c;
        height: 3500px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1750px;
        margin-left: -3000px;
        width: 6000px;
    }

    .canvas-container #canvas-grid-layer {
        --grid-color: rgba(0, 0, 0, 0.12);
        --sub-grid-color: rgba(0, 0, 0, 0.07);

        background: repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent calc(var(--grid-size) - 1px),
                var(--grid-color) calc(var(--grid-size) - 1px),
                var(--grid-color) var(--grid-size)
            ),
            repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent calc(var(--sub-grid-size) - 1px),
                var(--sub-grid-color) calc(var(--sub-grid-size) - 1px),
                var(--sub-grid-color) var(--sub-grid-size)
            ),
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent calc(var(--grid-size) - 1px),
                var(--grid-color) calc(var(--grid-size) - 1px),
                var(--grid-color) var(--grid-size)
            ),
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent calc(var(--sub-grid-size) - 1px),
                var(--sub-grid-color) calc(var(--sub-grid-size) - 1px),
                var(--sub-grid-color) var(--sub-grid-size)
            );
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>
