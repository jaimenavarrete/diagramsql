<script>
    import { onMount } from 'svelte';
    import {
        IconCircleLetterN,
        IconCircleLetterU,
        IconKey,
    } from '@tabler/icons-svelte';

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

<div
    bind:this={tableRef}
    class="table"
    style:--table-color={table.color}
    style:top={`${table.positionY}px`}
    style:left={`${table.positionX}px`}
>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <h3 on:mousedown={() => (isTableGrabbed = true)}>{table.title}</h3>
    <table class="properties-list">
        <tr class="property">
            <td class="key pk-key" title="Primary Key"><IconKey size={22} /></td
            >
            <td class="name">id</td>
            <td class="type">int</td>
            <td class="constraints nullable" />
            <td class="constraints unique" />
        </tr>
        <tr class="property">
            <td class="key" />
            <td class="name">name</td>
            <td class="type">varchar(50)</td>
            <td class="constraints nullable"
                ><span title="Nullable"><IconCircleLetterN size={22} /></span
                ></td
            >
            <td class="constraints unique" />
        </tr>
        <tr class="property">
            <td class="key" title="Foreign Key"><IconKey size={22} /></td>
            <td class="name">categoryId</td>
            <td class="type">int</td>
            <td class="constraints nullable" />
            <td class="constraints unique"
                ><span title="Unique"><IconCircleLetterU size={22} /></span></td
            >
        </tr>
        <tr class="property">
            <td class="key" />
            <td class="name">phoneNumber</td>
            <td class="type">varchar(10)</td>
            <td class="constraints nullable"
                ><span title="Nullable"><IconCircleLetterN size={22} /></span
                ></td
            >
            <td class="constraints unique"
                ><span title="Unique"><IconCircleLetterU size={22} /></span></td
            >
        </tr>
    </table>
    <p>{table.description}</p>
</div>

<svelte:document
    on:mouseup={() => (isTableGrabbed = false)}
    on:mousemove={moveTable}
/>

<style>
    .table {
        background-color: #ededed;
        box-sizing: border-box;
        border: 1px solid #4e4e4e;
        border-top: 5px solid var(--table-color);
        border-radius: 5px;
        color: #4e4e4e;
        cursor: pointer;
        max-width: 450px;
        position: absolute;
        z-index: 2;
    }

    .table:hover {
        border-color: #4752c7;
        border-top-color: var(--table-color);
    }

    .table:hover h3 {
        background: rgba(88, 101, 242, 0.2);
        color: #4752c7;
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
        cursor: auto;
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
        cursor: auto;
        font-size: 0.9em;
        line-height: 1.8;
        margin: 0;
        padding: 15px 10px;
    }
</style>
