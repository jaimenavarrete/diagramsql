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
    export let tables;
    export let notes;

    // Element references
    let formRef;

    // States
    let formWidth,
        isResizeBarGrabbed = false;

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
        <h2>Diagram Explorer</h2>
        <button type="button"><IconChevronLeft /></button>
    </header>

    <!-- Content -->
    <section class="form-section">
        <h3><IconPackages /> <span>Elements</span></h3>
        <ul class="menu-items">
            <li class="dropdown">
                <label class="dropdown-button">
                    <input type="checkbox" class="dropdown-check" checked />
                    <span class="arrow"><IconCaretRightFilled size={18} /></span
                    >
                    <IconTable size={20} />
                    <span class="text">Tables</span>
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
                                        <button class="action-button">
                                            <IconCurrentLocation size={20} />
                                        </button>
                                        <button
                                            class="action-button delete-button"
                                            title="Delete table"
                                        >
                                            <IconTrash size={20} />
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
                    <input type="checkbox" class="dropdown-check" />
                    <span class="arrow"><IconCaretRightFilled size={18} /></span
                    >
                    <IconNote size={20} />
                    <span class="text">Notes</span>
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
                                        <button class="action-button">
                                            <IconCurrentLocation size={20} />
                                        </button>
                                        <button
                                            class="action-button delete-button"
                                            title="Delete note"
                                        >
                                            <IconTrash size={20} />
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
        margin-bottom: 30px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    header h2 {
        color: #212121;
        font-size: 1.2em;
        padding: 10px;
    }

    header button {
        background: transparent;
        border: none;
        border-radius: 5px;
        color: #212121;
        cursor: pointer;
        padding: 10px;
    }

    header button:hover {
        color: #5865f2;
    }

    .form-section {
        padding: 0 10px;
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
        padding: 3px;
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

    .dropdown .dropdown-button {
        background: #f2f2f2;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.95em;
        padding: 5px;
        transition: all 0.2s ease-out;

        display: flex;
        justify-content: start;
        align-items: center;
    }

    .dropdown .dropdown-button:hover {
        background-color: #5865f220;
        color: #4752c7;
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

    .dropdown .dropdown-button .text {
        margin-left: 5px;
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

    .dropdown .dropdown-content li {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
