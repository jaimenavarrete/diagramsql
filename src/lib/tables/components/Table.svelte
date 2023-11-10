<script>
    import { onMount } from 'svelte';

    export let table;
    export let canvasHeight;
    export let canvasWidth;
    export let zoomRatio;

    let tableRef;

    let isTableGrabbed = false;

    // Event handler

    const moveTable = (e) => {
        if (!isTableGrabbed) return;

        e.preventDefault();

        table.positionY += e.movementY / zoomRatio;
        table.positionX += e.movementX / zoomRatio;
    };

    // Lifecycle hook

    onMount(() => {
        const tableStyles = window.getComputedStyle(tableRef);

        table.positionY = canvasHeight / 2;
        table.positionX = canvasWidth / 2;
        table.width = parseFloat(tableStyles.getPropertyValue('width'));
        table.height = parseFloat(tableStyles.getPropertyValue('height'));
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    bind:this={tableRef}
    on:mousedown|self={() => (isTableGrabbed = true)}
    class="table"
    style:--table-color={table.color}
    style:top={`${table.positionY}px`}
    style:left={`${table.positionX}px`}
>
    <h3>{table.title}</h3>
    <p>{table.description}</p>
</div>

<svelte:document
    on:mouseup={() => (isTableGrabbed = false)}
    on:mousemove={moveTable}
/>

<style>
    .table {
        background-color: #fff;
        border-top: 7px solid var(--table-color);
        border-radius: 5px;
        box-shadow: 0 0 2px var(--table-color);
        max-width: 300px;
        position: absolute;
        z-index: 2;
    }

    h3 {
        background: #f2f2f2;
        border-bottom: 1px solid #cbcbcb;
        cursor: auto;
        font-size: 1.1em;
        padding: 15px;
        text-align: center;
    }

    p {
        cursor: auto;
        color: #4e4e4e;
        margin: 0;
        padding: 15px;
    }
</style>
