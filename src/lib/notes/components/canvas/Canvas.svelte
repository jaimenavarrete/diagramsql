<script>
    import Note from '../Note.svelte';
    import ConnectionArrow from '../connection-arrow/ConnectionArrow.svelte';
    import ZoomButtons from './ZoomButtons.svelte';

    export let notes = [];

    // Canvas interaction
    let specialKey = ' ';

    // Element references
    let containerRef;

    // States
    let zoomRatio = 1,
        canvasHeight = 100000,
        canvasWidth = 100000,
        canvasTop,
        canvasLeft,
        isSpecialKeyPressed = false,
        isCanvasGrabbed = false;

    // Reactive variables
    $: gridHeight = canvasHeight * zoomRatio;
    $: gridWidth = canvasWidth * zoomRatio;
    $: gridSize = 100 * zoomRatio;
    $: subGridSize = 20 * zoomRatio;
    $: gridMarginTop = (-1 * gridHeight) / 2;
    $: gridMarginLeft = (-1 * gridWidth) / 2;
    $: containerStyles = containerRef
        ? window.getComputedStyle(containerRef)
        : null;

    // Utility functions
    const getContainerStyle = (propertyName) =>
        parseFloat(containerStyles.getPropertyValue(propertyName));

    let showResetPositionButton;

    // Event Handlers

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

        showResetPositionButton();
    };

    let changeCanvasZoomMouseWheel;
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
        on:mousemove={moveCanvas}
        on:wheel={changeCanvasZoomMouseWheel}
        style:transform={`scale(${zoomRatio})`}
        style:top={canvasTop ? `${canvasTop}px` : null}
        style:left={canvasLeft ? `${canvasLeft}px` : null}
        style:cursor={isSpecialKeyPressed ? 'grab' : 'default'}
    >
        {#each notes as note}
            <Note bind:note {canvasHeight} {canvasWidth} {zoomRatio} />

            {#if note.parentId}
                <ConnectionArrow parentNote={notes[0]} childNote={note} />
            {/if}
        {/each}
    </div>

    <ZoomButtons
        bind:zoomRatio
        bind:canvasTop
        bind:canvasLeft
        bind:showResetPositionButton
        bind:changeCanvasZoomMouseWheel
        {getContainerStyle}
    />
</div>

<!-- Document reference -->
<svelte:document
    on:keydown={activateSpecialKey}
    on:keyup={deactivateSpecialKey}
    on:mouseup={() => (isCanvasGrabbed = false)}
/>

<style>
    .canvas-container {
        background-color: #f2f2f2;
        height: 100vh;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .canvas-container #canvas {
        box-shadow: 0 0 1px #7c7c7c;
        height: 100000px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50000px;
        margin-left: -50000px;
        width: 100000px;
    }

    .canvas-container #canvas-grid-layer {
        --grid-color: #e0e0e0;
        --sub-grid-color: #ebebeb;

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
