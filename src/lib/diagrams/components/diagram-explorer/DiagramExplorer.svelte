<script>
    import { onMount } from 'svelte';
    import {
        IconCaretRightFilled,
        IconChevronLeft,
        IconNote,
        IconTable,
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
        <h3>Elements</h3>
        <ul class="menu-items">
            <li class="dropdown">
                <label class="dropdown-button">
                    <input type="checkbox" class="dropdown-check" checked />
                    <span class="arrow"><IconCaretRightFilled size={20} /></span
                    >
                    <IconTable />
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
                                    {table.name || 'No name'}
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </li>
            <li class="dropdown">
                <label class="dropdown-button">
                    <input type="checkbox" class="dropdown-check" />
                    <span class="arrow"><IconCaretRightFilled size={20} /></span
                    >
                    <IconNote />
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
                                    {note.name || 'No name'}
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
        background: #e4e4e4;
        margin-bottom: 20px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    header h2 {
        color: #212121;
        font-size: 1em;
        padding: 10px 20px;
        text-transform: uppercase;
    }

    header button {
        background: transparent;
        border: none;
        border-radius: 5px;
        color: #212121;
        cursor: pointer;
        padding: 10px 20px;
    }

    header button:hover {
        color: #5865f2;
    }

    .form-section h3 {
        border-top: 1px solid #f2f2f2;
        border-bottom: none;
        color: #b3b3b3;
        font-size: 0.9em;
        margin-bottom: 10px;
        padding-top: 20px;
        text-transform: uppercase;
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

    .dropdown .dropdown-button {
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s ease-out;

        display: flex;
        justify-content: start;
        padding: 10px;
    }

    .dropdown .dropdown-button:hover,
    .dropdown .dropdown-button:has(:checked) {
        background-color: #5865f220;
        border-color: #4752c7;
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
        font-size: 0.95em;
        margin-left: 10px;
        padding: 10px;
        padding-left: 15px;
        position: relative;
    }

    .dropdown .dropdown-content li:hover {
        background-color: #5865f220;
        color: #4752c7;
    }

    .dropdown .dropdown-content li::before {
        content: '';

        background-color: var(--color);
        border-radius: 100%;
        display: inline-block;
        height: 13px;
        left: 0;
        position: absolute;
        top: 50%;
        transform: translate(-60%, -50%);
        width: 13px;
    }

    /* No elements text */

    .dropdown .dropdown-content .no-elements-text {
        background-color: #f2f2f2;
        border-radius: 5px;
        color: #4e4e4e;
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
