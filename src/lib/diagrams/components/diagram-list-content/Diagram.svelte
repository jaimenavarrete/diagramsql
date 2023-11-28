<script>
    import { scale } from 'svelte/transition';
    import { IconHeart, IconHeartFilled } from '@tabler/icons-svelte';
    import { navigate } from 'svelte-routing';

    export let diagram = {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<article
    class="diagram-item"
    role="listitem"
    on:click={() => navigate(`/diagrams/${diagram.id}`, { replace: false })}
>
    <figure class="diagram-image">
        <img src="/images/favicon-light.svg" alt="Diagram Logo" />
    </figure>
    <div class="diagram-info">
        <h3>
            {diagram.title}
            <button
                class="favorite-button"
                class:is-favorite={diagram.isFavorite}
                on:click|stopPropagation={() =>
                    (diagram.isFavorite = !diagram.isFavorite)}
            >
                {#if diagram.isFavorite}
                    <span in:scale><IconHeartFilled /></span>
                {:else}
                    <span in:scale><IconHeart /></span>
                {/if}
            </button>
        </h3>
        <small>Edited {diagram.modifiedAt || 'today'}</small>
    </div>
</article>

<style>
    /* Diagram item */

    .diagram-item {
        background-color: #fff;
        border: 1px solid #e4e4e4;
        border-radius: 10px;
        cursor: pointer;
    }

    .diagram-item .diagram-image {
        background-color: #f2f2f2;
        border-radius: 10px 10px 0 0;
        position: relative;
    }

    .diagram-item .diagram-image::before {
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
        z-index: 5;
    }

    .diagram-item:hover .diagram-image::before,
    .diagram-item:hover .favorite-button {
        opacity: 1;
    }

    .diagram-item img {
        display: block;
        height: auto;
        width: 100%;
    }

    .diagram-item .diagram-info {
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
