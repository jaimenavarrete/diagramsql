<script>
    import './../../../../assets/css/canvas-buttons.css';

    import Table from '../../../tables/components/Table.svelte';
    import Note from '../../../notes/components/Note.svelte';
    import ConnectionArrow from '../connection-arrow/ConnectionArrow.svelte';
    import ToolbarButtons from './canvas-buttons/ToolbarButtons.svelte';
    import ZoomButtons from './canvas-buttons/ZoomButtons.svelte';

    import TablePropertiesForm from '../../../tables/components/table-properties-form/TablePropertiesForm.svelte';
    import NotePropertiesForm from '../../../notes/components/NotePropertiesForm.svelte';
    import { ElementTypes } from '../../../shared/constants/element-types';

    export let tables = [];
    export let notes = [];

    // Canvas interaction
    let specialKey = ' ';

    // Element references
    let containerRef;
    let canvasRef;

    // States
    let zoomRatio = 1,
        canvasHeight = 100000,
        canvasWidth = 100000,
        canvasTop,
        canvasLeft,
        isSpecialKeyPressed = false,
        isCanvasGrabbed = false,
        isGridActive,
        hoveredTable,
        selectedElement;

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

    const findTable = (tableId) => tables.find((table) => table.id === tableId);

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

<div bind:this={containerRef} class="canvas-container">
    {#if selectedElement?.type === ElementTypes.Table}
        <TablePropertiesForm bind:tables bind:selectedTable={selectedElement} />
    {:else if selectedElement?.type === ElementTypes.Note}
        <NotePropertiesForm bind:notes bind:selectedNote={selectedElement} />
    {/if}

    <div
        class="canvas-grid-layer"
        style:--grid-size={`${gridSize}px`}
        style:--sub-grid-size={`${subGridSize}px`}
        style:--grid-color={`${isGridActive ? '#e0e0e0' : 'transparent'}`}
        style:--sub-grid-color={`${isGridActive ? '#ebebeb' : 'transparent'}`}
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
        bind:this={canvasRef}
        on:mousedown={() => (isCanvasGrabbed = isSpecialKeyPressed)}
        on:mousemove={moveCanvas}
        on:wheel={changeCanvasZoomMouseWheel}
        class="canvas"
        style:transform={`scale(${zoomRatio})`}
        style:top={canvasTop ? `${canvasTop}px` : null}
        style:left={canvasLeft ? `${canvasLeft}px` : null}
        style:cursor={isSpecialKeyPressed ? 'grab' : 'default'}
    >
        {#each tables as table}
            <Table
                bind:table
                bind:hoveredTable
                bind:selectedElement
                {canvasHeight}
                {canvasWidth}
                {zoomRatio}
            />

            {#each table.relationships as relation}
                {#if relation.foreignKeyFieldId && relation.primaryKeyFieldId}
                    <ConnectionArrow
                        parentTable={findTable(relation.primaryKeyTableId)}
                        childTable={table}
                        {selectedElement}
                        {hoveredTable}
                    />
                {/if}
            {/each}
        {/each}

        {#each notes as note}
            <Note
                bind:note
                bind:selectedElement
                {canvasHeight}
                {canvasWidth}
                {zoomRatio}
            />
        {/each}
    </div>

    <ToolbarButtons bind:tables bind:selectedElement />

    <ZoomButtons
        bind:zoomRatio
        bind:canvasTop
        bind:canvasLeft
        bind:isGridActive
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
        height: 100%;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .canvas-container .canvas {
        height: 100000px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50000px;
        margin-left: -50000px;
        width: 100000px;

        transition: transform 0.05s linear;
    }

    .canvas-container .canvas-grid-layer {
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
