<script>
    import './../../../../assets/css/properties-form-section.css';

    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { IconInfoCircle, IconX } from '@tabler/icons-svelte';

    import ColumnsSection from './ColumnsSection.svelte';

    export let tables;
    export let selectedTable;

    // Call tables state change
    $: selectedTable, (tables = tables);

    // Element references
    let formRef;
    let focusedElementRef;

    // States
    let formWidth,
        isResizeBarGrabbed = false;

    $: selectedTableId = selectedTable?.id;
    $: selectedTableId, focusedElementRef?.focus();

    // Event handlers

    const resizeForm = (e) => {
        if (!isResizeBarGrabbed) return;
        formWidth -= e.movementX;
    };

    // Life cycle
    onMount(() => {
        let formStyles = window.getComputedStyle(formRef);
        formWidth = parseFloat(formStyles.getPropertyValue('width'));
    });
</script>

<form
    transition:fade={{ duration: 100 }}
    bind:this={formRef}
    on:submit|preventDefault
    style:width={formWidth ? `${formWidth}px` : null}
>
    <header>
        <h2>Table properties</h2>
        <button on:click={() => (selectedTable = null)} type="button"
            ><IconX /></button
        >
    </header>
    <section class="form-section">
        <h3><IconInfoCircle /> <span>Information</span></h3>
        <div class="form-control">
            <label for="name">Name</label>
            <input
                bind:this={focusedElementRef}
                on:input={(e) => {
                    selectedTable.name = e.currentTarget.value;
                }}
                type="text"
                id="name"
                placeholder="Users"
                value={selectedTable?.name || null}
            />
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <textarea
                on:input={(e) => {
                    selectedTable.description = e.currentTarget.value;
                }}
                id="description"
                name="description"
                cols="30"
                rows="5"
                placeholder="Registered users"
                value={selectedTable?.description || null}
            />
        </div>
        <div class="form-control">
            <label for="color">Pick a color</label>
            <input
                on:input={(e) => {
                    selectedTable.color = e.currentTarget.value;
                }}
                type="color"
                id="color"
                name="color"
                value={selectedTable?.color || null}
            />
        </div>
    </section>
    <ColumnsSection bind:selectedTable />

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:mousedown={() => (isResizeBarGrabbed = true)} class="resize-bar" />
</form>

<svelte:document
    on:mouseup={() => (isResizeBarGrabbed = false)}
    on:mousemove={resizeForm}
/>

<style>
    form {
        background: #fff;
        border-left: 1px solid #e4e4e4;
        box-shadow: 0 0 25px #21212120;
        position: absolute;
        height: 100%;
        overflow: auto;
        right: 0;
        padding-bottom: 100px;
        top: 0;
        width: 500px;
        z-index: 1;
    }

    header {
        background: #e4e4e4;
        margin-bottom: 20px;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    form h2 {
        color: #212121;
        font-size: 1em;
        padding: 10px 20px;
        text-transform: uppercase;
    }

    form label {
        color: #4752c7;
        display: block;
        font-weight: bold;
        font-size: 0.85em;
        margin-bottom: 5px;
    }

    form input,
    form textarea {
        background: #f2f2f2;
        border: 1px solid #e4e4e4;
        border-radius: 5px;
        display: block;
        font-size: 15px;
        margin-bottom: 20px;
        padding: 10px;
        width: 100%;
    }

    form input:focus,
    form textarea:focus {
        outline-color: #4752c7;
    }

    form textarea {
        resize: vertical;
    }

    form input[type='color'] {
        background-color: transparent;
        cursor: pointer;
        padding: 0;
    }

    form button {
        background: transparent;
        border: none;
        border-radius: 5px;
        color: #212121;
        cursor: pointer;
        padding: 10px 20px;
    }

    form button:hover {
        color: #5865f2;
    }

    /*** RESIZE BAR STYLES ***/

    .resize-bar {
        cursor: col-resize;
        position: absolute;
        left: -3px;
        top: 0;
        width: 6px;
        height: 100%;
    }
</style>
