<script>
    import './../../../../assets/css/canvas-buttons.css';

    import { onMount } from 'svelte';
    import Table from '../../../tables/components/Table.svelte';
    import Note from '../../../notes/components/Note.svelte';
    import ConnectionArrow from '../connection-arrow/ConnectionArrow.svelte';
    import ToolbarButtons from './canvas-buttons/ToolbarButtons.svelte';
    import ZoomButtons from './canvas-buttons/ZoomButtons.svelte';

    import TablePropertiesForm from '../../../tables/components/table-properties-form/TablePropertiesForm.svelte';
    import NotePropertiesForm from '../../../notes/components/NotePropertiesForm.svelte';
    import { ElementTypes } from '../../../shared/constants/element-types';
    import CanvasGrid from './CanvasGrid.svelte';

    export let tables = [];
    export let notes = [];
    export let selectedElement;

    // Canvas interaction
    let specialKey = ' ';

    // Element references
    let containerRef;
    let containerStyles;

    // States

    export let canvasInfo = {
        zoomRatio: 1,
        containerHeight: 0,
        containerWidth: 0,
        height: 100000,
        width: 100000,
        top: 0,
        left: 0,
    };

    let isSpecialKeyPressed = false,
        isCanvasGrabbed = false,
        isGridActive,
        hoveredTable;

    // Utility functions
    const getContainerStyle = (propertyName) =>
        parseFloat(containerStyles.getPropertyValue(propertyName));

    const findTable = (tableId) => tables.find((table) => table.id === tableId);

    let showResetPositionButton;

    // Event Handlers

    const updateContainerSize = () => {
        canvasInfo.containerHeight = getContainerStyle('height');
        canvasInfo.containerWidth = getContainerStyle('width');
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

        canvasInfo.top += e.movementY;
        canvasInfo.left += e.movementX;

        showResetPositionButton();
    };

    let changeCanvasZoomMouseWheel;

    onMount(() => {
        containerStyles = window.getComputedStyle(containerRef);

        updateContainerSize();
        canvasInfo.top = canvasInfo.containerHeight / 2;
        canvasInfo.left = canvasInfo.containerWidth / 2;
    });
</script>

<div bind:this={containerRef} class="canvas-container">
    <!-- Canvas Grid -->
    <CanvasGrid {canvasInfo} {isGridActive} />

    {#if selectedElement?.type === ElementTypes.Table}
        <TablePropertiesForm bind:tables bind:selectedTable={selectedElement} />
    {:else if selectedElement?.type === ElementTypes.Note}
        <NotePropertiesForm bind:notes bind:selectedNote={selectedElement} />
    {/if}

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        id="canvas"
        on:mousedown={() => (isCanvasGrabbed = isSpecialKeyPressed)}
        on:mousemove={moveCanvas}
        on:wheel={changeCanvasZoomMouseWheel}
        class="canvas"
        style:transform={`scale(${canvasInfo.zoomRatio})`}
        style:top={`${canvasInfo.top}px`}
        style:left={`${canvasInfo.left}px`}
        style:cursor={isSpecialKeyPressed ? 'grab' : 'default'}
    >
        {#each tables as table}
            <Table
                bind:table
                bind:hoveredTable
                bind:selectedElement
                {canvasInfo}
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
            <Note bind:note bind:selectedElement {canvasInfo} />
        {/each}
    </div>

    <ToolbarButtons on:addTable on:addNote />

    <ZoomButtons
        bind:canvasInfo
        bind:isGridActive
        bind:showResetPositionButton
        bind:changeCanvasZoomMouseWheel
    />
</div>

<!-- Document reference -->
<svelte:document
    on:keydown={activateSpecialKey}
    on:keyup={deactivateSpecialKey}
    on:mouseup={() => (isCanvasGrabbed = false)}
/>

<!-- Window reference -->
<svelte:window on:resize={updateContainerSize} />

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
</style>
