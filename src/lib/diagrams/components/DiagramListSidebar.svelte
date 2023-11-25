<script>
    import {
        IconClock,
        IconFolder,
        IconFolders,
        IconHeart,
        IconLayoutGrid,
    } from '@tabler/icons-svelte';

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
    <nav class="form-section nav-menu">
        <ul class="menu-items">
            <li>
                <button class="menu-button"
                    ><IconClock size={20} /> <span>Recent diagrams</span>
                </button>
            </li>
            <li>
                <button class="menu-button"
                    ><IconHeart size={20} /> <span>Favorite diagrams</span>
                </button>
            </li>
        </ul>
        <ul class="menu-items">
            <li>
                <button class="menu-button is-active"
                    ><IconLayoutGrid size={20} /> <span>All diagrams</span>
                </button>
            </li>
        </ul>

        <h3><IconFolders /> <span>Folders</span></h3>

        <ul class="menu-items">
            <li>
                <button class="menu-button"
                    ><IconFolder size={20} /> <span>My folder</span>
                </button>
            </li>
            <li>
                <button class="menu-button"
                    ><IconFolder size={20} /> <span>Public diagrams</span>
                </button>
            </li>
        </ul>
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
        border-right: 1px solid #f2f2f2;
        overflow: auto;
        padding-top: 30px;
        padding-bottom: 100px;
        position: relative;
    }

    .form-section h3 {
        margin-top: 30px;
        font-weight: bold;
    }

    .nav-menu .menu-items {
        list-style-type: none;
        padding-bottom: 30px;
    }

    .nav-menu .menu-button {
        background: none;
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.95em;
        padding: 10px;
        transition: all 0.2s ease-out;
        text-align: left;
        width: 100%;

        justify-content: start;
        align-items: start;
    }

    .nav-menu .menu-button:hover,
    .nav-menu .menu-button.is-active {
        background-color: #5865f220;
        color: #4752c7;
    }

    .nav-menu .menu-button span {
        margin-left: 5px;
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
