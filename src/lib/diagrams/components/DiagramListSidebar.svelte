<script>
    // Element references
    let formRef;

    // States
    let formWidth = 350,
        isResizeBarGrabbed = false;

    // Event handlers

    const resizeForm = (e) => {
        if (!isResizeBarGrabbed) return;
        formWidth += e.movementX;
    };
</script>

<aside bind:this={formRef} style:width={`${formWidth}px`}>
    <!-- Content -->
    <nav class="form-section menu-buttons">
        <ul class="menu-items"></ul>
    </nav>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        on:mousedown|preventDefault={() => (isResizeBarGrabbed = true)}
        class="resize-bar"
    />
</aside>

<svelte:document
    on:mouseup={() => (isResizeBarGrabbed = false)}
    on:mousemove={resizeForm}
/>

<style>
    /*** FORM STYLES ***/

    aside {
        background: #fff;
        border-right: 1px solid #e4e4e4;
        overflow: auto;
        padding-bottom: 100px;
        position: relative;
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
