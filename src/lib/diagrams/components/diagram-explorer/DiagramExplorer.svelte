<script>
    import { onMount } from 'svelte';
    import {
        IconCaretRightFilled,
        IconChevronLeft,
        IconCurrentLocation,
        IconNote,
        IconPackages,
        IconTable,
        IconTrash,
    } from '@tabler/icons-svelte';

    // Props
    export let tables = [];
    export let notes = [];
    export let selectedElement;

    // Element references
    let formRef;

    // States
    let formWidth,
        isResizeBarGrabbed = false;

    // Utility functions

    const deleteTable = (targetTable) => {
        if (selectedElement === targetTable) selectedElement = null;

        // Remove relationships to delete arrows related with deleted table
        tables.forEach((table) => {
            table.relationships = table.relationships.filter(
                (relation) => relation.primaryKeyTableId !== targetTable.id
            );
        });

        tables = tables.filter((table) => table.id !== targetTable.id);
    };

    const deleteNote = (targetNote) => {
        if (selectedElement === targetNote) selectedElement = null;

        notes = notes.filter((note) => note.id !== targetNote.id);
    };

    // Event handlers

    const resizeForm = (e) => {
        if (!isResizeBarGrabbed) return;
        formWidth += e.movementX;
    };

    // Life cycle
    onMount(() => {
        let formStyles = window.getComputedStyle(formRef);
        formWidth = parseFloat(formStyles.getPropertyValue('width'));
    });
</script>

<form
    bind:this={formRef}
    on:submit|preventDefault
    style:width={formWidth ? `${formWidth}px` : null}
>
    <header>
        <h2>Diagram explorer</h2>
        <button type="button"><IconChevronLeft /></button>
    </header>

    <!-- Content -->
    <section class="form-section">
        <h3><IconPackages /> <span>Elements</span></h3>
        <ul class="menu-items">
            <li class="dropdown">
                <label class="dropdown-button">
                    <span class="left-content">
                        <input type="checkbox" class="dropdown-check" checked />
                        <span class="arrow"
                            ><IconCaretRightFilled size={18} /></span
                        >
                        <IconTable size={20} />
                        <span class="text">Tables</span>
                    </span>
                    <span class="right-content">
                        <div class="elements-count">{tables.length}</div>
                    </span>
                </label>

                <div class="dropdown-content">
                    {#if !tables || tables.length === 0}
                        <p class="no-elements-text">There are no tables</p>
                    {:else}
                        <ul>
                            {#each tables as table}
                                <li
                                    style:--color={table.color}
                                    class="dropdown-item"
                                >
                                    <span class="left-content">
                                        {table.name || 'No name'}
                                    </span>
                                    <span class="right-content">
                                        <button
                                            on:click={() =>
                                                (selectedElement = table)}
                                            class="action-button"
                                        >
                                            <IconCurrentLocation size={22} />
                                        </button>
                                        <button
                                            on:click={() => deleteTable(table)}
                                            class="action-button delete-button"
                                            title="Delete table"
                                        >
                                            <IconTrash size={22} />
                                        </button>
                                    </span>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </li>
            <li class="dropdown">
                <label class="dropdown-button">
                    <span class="left-content">
                        <input type="checkbox" class="dropdown-check" />
                        <span class="arrow"
                            ><IconCaretRightFilled size={18} /></span
                        >
                        <IconNote size={20} />
                        <span class="text">Notes</span>
                    </span>
                    <span class="right-content">
                        <div class="elements-count">{notes.length}</div>
                    </span>
                </label>

                <div class="dropdown-content">
                    {#if !notes || notes.length === 0}
                        <p class="no-elements-text">There are no notes</p>
                    {:else}
                        <ul>
                            {#each notes as note}
                                <li
                                    style:--color={note.color}
                                    class="dropdown-item"
                                >
                                    <span class="left-content">
                                        {note.title || 'No name'}
                                    </span>
                                    <span class="right-content">
                                        <button
                                            on:click={() =>
                                                (selectedElement = note)}
                                            class="action-button"
                                        >
                                            <IconCurrentLocation size={22} />
                                        </button>
                                        <button
                                            on:click={() => deleteNote(note)}
                                            class="action-button delete-button"
                                            title="Delete note"
                                        >
                                            <IconTrash size={22} />
                                        </button>
                                    </span>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </li>
        </ul>
    </section>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        on:mousedown|preventDefault={() => (isResizeBarGrabbed = true)}
        class="resize-bar"
    />
</form>

<svelte:document
    on:mouseup={() => (isResizeBarGrabbed = false)}
    on:mousemove={resizeForm}
/>

<style>
    form {
        background: #fff;
        border-right: 1px solid #e4e4e4;
        overflow: auto;
        padding-bottom: 100px;
        position: relative;
        width: 350px;
    }

    header {
        margin-bottom: 15px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    header h2 {
        color: #212121;
        font-size: 1.2em;
        padding: 15px 10px;
    }

    header button {
        background: transparent;
        border: none;
        border-radius: 5px;
        color: #212121;
        cursor: pointer;
        padding: 15px 10px;
    }

    header button:hover {
        color: #5865f2;
    }

    /*** DROPDOWN STYLES ***/

    .menu-items,
    .dropdown .dropdown-content ul {
        list-style-type: none;
    }

    .dropdown {
        margin-bottom: 5px;
    }

    .dropdown:has(:checked) {
        --rows: 1fr;
    }

    .dropdown:has(:checked) .dropdown-content {
        margin: 5px 0 10px 0;
    }

    .dropdown .action-button {
        background-color: transparent;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 7px;
    }

    .dropdown .action-button:hover {
        background-color: #5865f220;
        color: #4752c7;
    }

    .dropdown .action-button.delete-button {
        color: #de3a2b;
    }

    .dropdown .action-button.delete-button:hover {
        background-color: #de3a2b20;
    }

    .dropdown .dropdown-button,
    .dropdown .dropdown-content li {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .dropdown .dropdown-button {
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.95em;
        padding: 5px;
        transition: all 0.2s ease-out;
    }

    .dropdown .dropdown-button:hover {
        background-color: #5865f220;
        color: #4752c7;
    }

    .dropdown .dropdown-button .left-content {
        display: flex;
    }

    .dropdown .dropdown-button .text {
        margin-left: 5px;
    }

    .dropdown .dropdown-button .text span {
        margin-left: 7px;
    }

    .dropdown .dropdown-button .dropdown-check {
        display: none;
    }

    .dropdown .dropdown-button .arrow {
        margin-right: 10px;
        transition: transform 0.2s ease-out;

        display: flex;
        align-items: center;
    }

    .dropdown .dropdown-check:checked ~ .arrow {
        transform: rotate(90deg);
    }

    .dropdown .dropdown-button .elements-count {
        background: #5865f2;
        border-radius: 50%;
        color: #fff;
        font-size: 0.75em;
        font-weight: bold;
        height: 20px;
        padding-top: 2px;
        width: 20px;

        display: grid;
        place-content: center;
    }

    .dropdown .dropdown-content {
        display: grid;
        grid-template-rows: var(--rows, 0fr);
        transition: grid-template-rows 0.2s ease-out;
    }

    .dropdown .dropdown-content ul,
    .dropdown .dropdown-content .no-elements-text {
        overflow: hidden;
    }

    .dropdown .dropdown-content li {
        border-left: 3px solid var(--color);
        font-size: 0.85em;
        margin-left: 30px;
        padding: 5px 10px;
        padding-left: 15px;
        position: relative;
    }

    .dropdown .dropdown-content li:hover {
        background-color: #5865f220;
        color: #4752c7;
    }

    .dropdown .dropdown-content li::before {
        content: '';

        background-color: #fff;
        border: 3px solid var(--color);
        border-radius: 100%;
        display: inline-block;
        height: 7px;
        left: 0;
        position: absolute;
        top: 50%;
        transform: translate(-60%, -50%);
        width: 7px;
    }

    .dropdown .dropdown-content li .right-content {
        display: flex;
        justify-content: center;
    }

    /* No elements text */

    .dropdown .dropdown-content .no-elements-text {
        color: #b3b3b3;
        font-size: 0.9em;
        text-align: center;
    }

    /*** RESIZE BAR STYLES ***/

    .resize-bar {
        cursor: col-resize;
        position: absolute;
        right: 0;
        top: 0;
        width: 6px;
        height: 100%;
    }
</style>
