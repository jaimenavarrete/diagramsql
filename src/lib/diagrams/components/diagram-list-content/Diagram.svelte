<script>
    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();

    import { scale } from 'svelte/transition';
    import {
        IconCopy,
        IconDotsVertical,
        IconHeart,
        IconHeartFilled,
        IconPencil,
        IconTrash,
    } from '@tabler/icons-svelte';
    import { navigate } from 'svelte-routing';

    // Element references
    let optionMenuRef;

    export let diagram = {};

    // States
    let isOptionMenuActive = false;
    let isOptionMenuOffScreen = false;

    // Utility functions

    const checkOptionMenuPosition = () => {
        const optionMenuStyles = optionMenuRef.getBoundingClientRect();

        isOptionMenuOffScreen =
            optionMenuStyles.right >= document.documentElement.clientWidth;
    };

    // Event handlers

    const updateFavorite = () => {
        diagram.isFavorite = !diagram.isFavorite;

        dispatch('updateFavorite', {
            id: diagram.id,
            isFavorite: diagram.isFavorite,
        });
    };

    const activeOptionMenu = () => (isOptionMenuActive = !isOptionMenuActive);

    onMount(() => checkOptionMenuPosition());
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
    on:click={() => navigate(`/diagrams/${diagram.id}`, { replace: false })}
    class="diagram-item"
>
    <section class="diagram-image">
        <img src="/images/favicon-light.svg" alt="Diagram Logo" />
        <button
            on:click|stopPropagation={activeOptionMenu}
            class="option-menu-button"
        >
            <IconDotsVertical />
        </button>
        <div
            bind:this={optionMenuRef}
            class="option-menu"
            class:is-option-menu-active={isOptionMenuActive}
            class:left-positioned={isOptionMenuOffScreen}
        >
            <ul class="option-menu-content" on:click|stopPropagation>
                <li class="option-item">
                    <button
                        ><IconCopy size={20} /> <span>Duplicate</span></button
                    >
                </li>
                <li class="option-item">
                    <button><IconPencil size={20} /> <span>Rename</span></button
                    >
                </li>
                <li class="divider"><hr /></li>
                <li class="option-item delete-button">
                    <button><IconTrash size={20} /> <span>Delete</span></button>
                </li>
            </ul>
        </div>
    </section>
    <section class="diagram-info">
        <h3>
            {diagram.title}
            <button
                class="favorite-button"
                class:is-favorite={diagram.isFavorite}
                on:click|stopPropagation={updateFavorite}
            >
                {#if diagram.isFavorite}
                    <span in:scale><IconHeartFilled /></span>
                {:else}
                    <span in:scale><IconHeart /></span>
                {/if}
            </button>
        </h3>
        <small>Edited {diagram.modifiedAt || 'today'}</small>
    </section>
</article>

<svelte:document on:click={() => (isOptionMenuActive = false)} />

<style>
    .diagram-item {
        background-color: #fff;
        border: 1px solid #e4e4e4;
        border-radius: 10px;
        cursor: pointer;
    }

    /*** DIAGRAM IMAGE ***/

    .diagram-image {
        background-color: #f2f2f2;
        border-radius: 10px 10px 0 0;
        position: relative;
    }

    .diagram-image::before {
        content: '';

        background-color: #212121b0;
        border-radius: 10px 10px 0 0;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        transition: 0.2s all;
        width: 100%;
    }

    .diagram-item:hover .diagram-image::before,
    .diagram-item:hover .favorite-button,
    .diagram-item:hover .option-menu-button {
        opacity: 1;
    }

    .diagram-image img {
        display: block;
        height: auto;
        width: 100%;
    }

    /* Option menu */

    .diagram-image .option-menu-button {
        background: none;
        border: none;
        color: #b3b3b3;
        cursor: pointer;
        opacity: 0;
        padding: 5px;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 1;
    }

    .diagram-image .option-menu-button:hover {
        color: #fff;
    }

    .diagram-image .option-menu {
        background-color: #fff;
        border: 1px solid #e4e4e4;
        border-radius: 5px;
        box-shadow: 0 0 25px #21212150;
        opacity: 0;
        padding: 5px;
        position: absolute;
        right: 5px;
        transition:
            visibility 0.2s,
            opacity 0.2s;
        transform: translate(100%, 0);
        top: -10px;
        visibility: hidden;
        width: 110%;
        z-index: 1;
    }

    .diagram-image .option-menu.left-positioned {
        right: 50px;
        transform: translate(0, 0);
    }

    .diagram-image .option-menu.is-option-menu-active {
        visibility: visible;
        opacity: 1;
    }

    .diagram-image .option-menu-content {
        list-style-type: none;
    }

    .diagram-image .option-menu-content .option-item button {
        background: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9em;
        padding: 13px 10px;
        justify-content: start;
        width: 100%;
    }

    .diagram-image .option-menu-content .option-item button:hover {
        background-color: #5865f220;
        color: #4752c7;
    }

    .diagram-image .option-menu-content .option-item span {
        margin-left: 5px;
    }

    .diagram-image .option-menu-content .divider hr {
        border: none;
        border-top: 1px solid #f2f2f2;
        margin: 10px 0;
    }

    .diagram-image .option-menu-content .delete-button button {
        color: #e14d45;
    }

    .diagram-image .option-menu-content .delete-button button:hover {
        background-color: #e14d4530;
        color: #e14d45;
    }

    /*** DIAGRAM INFO ***/

    .diagram-info {
        padding: 10px;
    }

    .diagram-info h3 {
        font-size: 1em;

        display: flex;
        justify-content: space-between;
    }

    .diagram-info .favorite-button {
        background: none;
        border: none;
        color: #536aec;
        cursor: pointer;
        opacity: 0;
        transition: 0.1s all;
    }

    .diagram-info .favorite-button.is-favorite {
        opacity: 1;
    }

    .diagram-info .favorite-button:hover {
        color: #e14d45;
    }

    .diagram-info small {
        color: #4e4e4e;
        display: block;
        font-size: 0.8em;
    }
</style>
