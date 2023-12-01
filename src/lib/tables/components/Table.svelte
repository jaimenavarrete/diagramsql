<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { onMount } from 'svelte';
    import {
        IconCircleLetterN,
        IconCircleLetterU,
        IconKey,
    } from '@tabler/icons-svelte';

    export let canvasInfo;
    export let table;
    export let hoveredTable;
    export let selectedElement;

    let tableRef;
    let tableStyles;

    let isTableGrabbed = false;
    $: table, (table.width = getStyleValue('width'));
    $: table, (table.height = getStyleValue('height'));

    // Utility functions

    const getStyleValue = (property) =>
        parseFloat(tableStyles?.getPropertyValue(property));

    const isForeignKey = (columnId) =>
        table.relationships.some(
            (relation) => relation.foreignKeyFieldId === columnId
        );

    const setTablePositionValues = () => {
        if (table.positionX && table.positionY) return;

        const deltaTop =
            (canvasInfo.containerHeight / 2 - canvasInfo.top) /
            canvasInfo.zoomRatio;
        const deltaLeft =
            (canvasInfo.containerWidth / 2 - canvasInfo.left) /
            canvasInfo.zoomRatio;

        table.positionY = (canvasInfo.height - table.height) / 2 + deltaTop;
        table.positionX = (canvasInfo.width - table.width) / 2 + deltaLeft;

        // Update table to save initial position values
        dispatch('updateTable', table);
    };

    // Event handler

    const selectTable = () => (selectedElement = table);

    const moveTable = (e) => {
        if (!isTableGrabbed) return;

        e.preventDefault();

        table.positionY += e.movementY / canvasInfo.zoomRatio;
        table.positionX += e.movementX / canvasInfo.zoomRatio;
    };

    // Lifecycle hook

    onMount(() => {
        tableStyles = window.getComputedStyle(tableRef);

        table.height = getStyleValue('height');
        table.width = getStyleValue('width');

        setTablePositionValues();
    });
</script>

<div
    bind:this={tableRef}
    on:mouseenter={() => (hoveredTable = table)}
    on:mouseleave={() => (hoveredTable = null)}
    class="table"
    style:--table-color={table.color}
    style:top={`${table.positionY}px`}
    style:left={`${table.positionX}px`}
    class:selected-table={table === selectedElement}
    role="table"
>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    {#if !table.name}
        <h3 on:mousedown={() => (isTableGrabbed = true)} class="no-name-text">
            No name
        </h3>
    {:else}
        <h3 on:mousedown={() => (isTableGrabbed = true)}>{table.name}</h3>
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div on:click={selectTable} role="article">
        <table class="properties-list">
            {#if !table?.columns || table.columns.length === 0}
                <tr class="no-columns-text">
                    <td>No columns</td>
                </tr>
            {:else}
                {#each table.columns as column}
                    <tr class="property">
                        <td
                            class="key"
                            class:pk-key={column.isPrimaryKey}
                            title="Primary Key"
                        >
                            {#if column.isPrimaryKey || isForeignKey(column.id)}
                                <IconKey size={22} />
                            {/if}
                        </td>
                        <td
                            class="name"
                            class:no-column-value-text={!column.name}
                            >{column.name || 'No name'}</td
                        >
                        <td
                            class="type"
                            class:no-column-value-text={!column.type}
                            >{column.type || 'No type'}</td
                        >
                        <td class="constraints nullable">
                            {#if column.isNullable}
                                <span title="Nullable"
                                    ><IconCircleLetterN size={22} /></span
                                >
                            {/if}
                        </td>
                        <td class="constraints unique">
                            {#if column.isUnique}
                                <span title="Unique"
                                    ><IconCircleLetterU size={22} /></span
                                >
                            {/if}
                        </td>
                    </tr>
                {/each}
            {/if}
        </table>

        {#if !table.description}
            <p class="no-description-text">No description</p>
        {:else}
            <p>{table.description}</p>
        {/if}
    </div>
</div>

<svelte:document
    on:mouseup={() => (isTableGrabbed = false)}
    on:mousemove={moveTable}
/>

<style>
    .table {
        background-color: #ededed;
        box-sizing: border-box;
        border: 1px solid var(--table-color);
        border-top: 5px solid var(--table-color);
        border-radius: 5px;
        box-shadow: 0 0 25px #21212120;
        color: #4e4e4e;
        cursor: pointer;
        max-width: 450px;
        position: absolute;
        z-index: 2;
    }

    .table:hover h3 {
        background: rgba(88, 101, 242, 1);
        color: #fff;
    }

    .selected-table {
        border-color: #4752c7;
        border-top-color: var(--table-color);
        box-shadow: 0 0 25px #4752c775;
    }

    .selected-table h3 {
        background: rgba(88, 101, 242, 1);
        color: #fff;
    }

    h3 {
        border-bottom: 1px solid #e5e5e5;
        cursor: move;
        font-size: 1.1em;
        padding: 15px;
        text-align: center;
        transition: all 0.1s ease-out;
    }

    .properties-list {
        background-color: #fff;
        border-collapse: collapse;
        width: 100%;
    }

    .properties-list td {
        font-size: 0.9em;
        padding: 8px 10px;
    }

    .properties-list .key {
        padding: 0 0 0 10px;
    }

    .properties-list .pk-key {
        color: #ed991d;
    }

    .properties-list .name {
        font-weight: bold;
        word-break: break-all;
    }

    .properties-list .constraints {
        color: #000;
        padding: 3px;
    }

    .properties-list .unique {
        padding-right: 15px;
    }

    p {
        background-color: #fff;
        border-top: 1px solid #e5e5e5;
        border-radius: 0 0 5px 5px;
        font-size: 0.9em;
        line-height: 1.8;
        margin: 0;
        padding: 15px 10px;
    }

    /* Empty state styles */

    .table .no-name-text {
        color: #b3b3b3;
    }

    .table:hover .no-name-text,
    .selected-table .no-name-text {
        color: #ffffff40;
    }

    .table .no-columns-text,
    .table .no-description-text {
        color: #b3b3b3;
        text-align: center;
    }

    .table .no-column-value-text {
        color: #b3b3b3;
    }
</style>
