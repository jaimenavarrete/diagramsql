<script>
    import { IconX } from '@tabler/icons-svelte';
    import { showToast } from '../../shared/components/Toasts.svelte';

    // Props
    export let tables;

    // Element references
    let formRef;

    // States
    let formWidth,
        isResizeBarGrabbed = false;

    // Reactive variables
    $: formStyles = formRef ? window.getComputedStyle(formRef) : null;

    // Utility functions
    const createTable = (formData) => ({
        id: crypto.randomUUID(),
        title: formData.get('title'),
        description: formData.get('description') || '[No description]',
        color: formData.get('color'),
        parentId: '2e2b5f22-4149-4410-8691-93844dd2dc4e',
    });

    // Event handlers
    const resizeForm = (e) => {
        if (!isResizeBarGrabbed) return;

        formWidth ??= parseFloat(formStyles.getPropertyValue('width'));
        formWidth -= e.movementX;
    };

    const submitForm = (e) => {
        const formData = new FormData(e.target);
        const table = createTable(formData);

        tables = [...tables, table];

        showToast('success', 'The table was created successfully');
    };
</script>

<form
    bind:this={formRef}
    on:submit|preventDefault={submitForm}
    style:width={formWidth ? `${formWidth}px` : null}
>
    <header>
        <h2>Table properties</h2>
        <button type="button"><IconX /></button>
    </header>
    <div class="form-control">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Users" />
    </div>
    <div class="form-control">
        <label for="description">Description</label>
        <textarea
            id="description"
            name="description"
            cols="30"
            rows="5"
            placeholder="Registered users"
        />
    </div>
    <div class="form-control">
        <label for="color">Pick a color</label>
        <input type="color" id="color" name="color" />
    </div>
    <div class="form-control">
        <button type="submit">Add table</button>
    </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:mousedown={() => (isResizeBarGrabbed = true)} class="resize-bar" />
</form>

<svelte:document
    on:mouseup={() => (isResizeBarGrabbed = false)}
    on:mousemove={resizeForm}
/>

<style>
    form {
        border-left: 1px solid #e4e4e4;
        position: relative;
        width: 20%;
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

    .form-control {
        padding: 0px 20px;
    }

    form label {
        color: #4e4e4e;
        display: block;
        font-weight: bold;
        font-size: 0.9em;
        margin-bottom: 5px;
    }

    form input,
    form textarea {
        border: 1px solid #5865f2;
        border-radius: 5px;
        box-sizing: border-box;
        display: block;
        font-size: 15px;
        margin-bottom: 1rem;
        padding: 10px;
        width: 100%;
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
        background: #e4e4e4;
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
