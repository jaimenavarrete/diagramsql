<script>
    import {
        IconChevronsLeft,
        IconChevronsRight,
        IconNote,
        IconPackages,
    } from '@tabler/icons-svelte';
    import ElementsDropdown from './ElementsDropdown.svelte';

    // Props
    export let tables = [];
    export let notes = [];
    export let selectedElement;

    // Element references
    let formRef;

    // States
    let formWidth = 350,
        isFormActive = true,
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
</script>

<aside class="form-container" class:is-active={isFormActive}>
    <section class="canvas-buttons">
        <div class="buttons-container">
            <button
                on:click={() => (isFormActive = true)}
                class="open-form-button"
                type="button"><IconChevronsRight size={20} /></button
            >
        </div>
    </section>

    <form
        bind:this={formRef}
        on:submit|preventDefault
        style:width={isFormActive ? `${formWidth}px` : '0px'}
    >
        <header>
            <h2>Diagram explorer</h2>
            <button on:click={() => (isFormActive = false)} type="button"
                ><IconChevronsLeft /></button
            >
        </header>

        <!-- Content -->
        <section class="form-section">
            <h3><IconPackages /> <span>Elements</span></h3>
            <ul class="menu-items">
                <li>
                    <ElementsDropdown
                        bind:elements={tables}
                        bind:selectedElement
                        deleteElement={deleteTable}
                        buttonText="Tables"
                    />
                </li>
                <li>
                    <ElementsDropdown
                        bind:elements={notes}
                        bind:selectedElement
                        deleteElement={deleteNote}
                        buttonText="Notes"
                    >
                        <IconNote slot="icon" />
                    </ElementsDropdown>
                </li>
            </ul>
        </section>

        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            on:mousedown|preventDefault={() => (isResizeBarGrabbed = true)}
            class="resize-bar"
        />
    </form>
</aside>

<svelte:document
    on:mouseup={() => (isResizeBarGrabbed = false)}
    on:mousemove={resizeForm}
/>

<style>
    /*** OPEN-CLOSE FORM BUTTON STYLES ***/

    .form-container {
        position: relative;
    }

    .form-container .canvas-buttons {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(100%, 15%);
        z-index: 1;

        transition: 0.1s width;
    }

    .form-container.is-active .canvas-buttons {
        display: none;
    }

    .form-container.is-active form {
        opacity: 1;
    }

    /*** FORM STYLES ***/

    form {
        background: #fff;
        border-right: 1px solid #e4e4e4;
        overflow: auto;
        padding-bottom: 100px;
        position: relative;
        transition: 0.2s width;
        height: 100%;
        opacity: 0;
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

    .menu-items {
        list-style-type: none;
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
