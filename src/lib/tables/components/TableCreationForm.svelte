<script>
    import { fade } from 'svelte/transition';

    import { IconColumns, IconInfoCircle, IconX } from '@tabler/icons-svelte';
    import { onMount } from 'svelte';

    export let tables;
    export let selectedTable;

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
                    tables = tables;
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
                    tables = tables;
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
                    tables = tables;
                }}
                type="color"
                id="color"
                name="color"
                value={selectedTable?.color || null}
            />
        </div>
    </section>
    <section class="form-section">
        <h3><IconColumns /> <span>Columns</span></h3>
        <div class="form-control">
            <input
                type="text"
                id="name"
                placeholder="Users"
                value={selectedTable?.name || null}
            />
        </div>
    </section>

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
        top: 0;
        right: 0;
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

    .form-section {
        margin-bottom: 30px;
        padding: 0px 20px;
    }

    .form-section h3 {
        border-bottom: 1px solid #f2f2f2;
        font-size: 1em;
        margin-bottom: 20px;
        padding-bottom: 10px;

        display: flex;
        align-items: center;
    }

    .form-section h3 span {
        margin-left: 5px;
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

    form .form-control button {
        background-color: #5865f2;
        color: #fff;
        font-family: 'Poppins', sans-serif, Arial, Helvetica;
        font-size: 15px;
        font-weight: bold;
        padding: 10px 15px;
        width: 100%;
    }

    form .form-control button:hover {
        background-color: #4752c7;
        color: #fff;
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
