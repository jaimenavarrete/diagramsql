<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { IconPlus } from '@tabler/icons-svelte';
    import Diagram from './Diagram.svelte';

    export let diagrams = [];
</script>

<main>
    <h2>All Diagrams</h2>
    <section class="diagrams-list">
        <article class="new-diagram-button">
            <button on:click={() => dispatch('addDiagram', {})}
                ><IconPlus size={40} />
                <span>New diagram</span></button
            >
        </article>

        {#each diagrams as diagram}
            <Diagram {diagram} on:updateFavorite on:deleteDiagram />
        {/each}
    </section>
</main>

<style>
    main {
        padding: 30px 20px;
    }

    h2 {
        color: #212121;
        font-size: 2em;
        margin-bottom: 50px;
    }

    .diagrams-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
        gap: 40px 30px;
    }

    /* New diagram button */

    .diagrams-list .new-diagram-button {
        min-height: 250px;
    }

    .diagrams-list .new-diagram-button button {
        background-color: #fff;
        border: 3px solid #536aec;
        border-radius: 10px;
        color: #536aec;
        cursor: pointer;
        flex-direction: column;
        font-size: 1em;
        height: 100%;
        transition: 0.2s all;
        width: 100%;
    }

    .diagrams-list .new-diagram-button button:hover {
        background-color: #536aec;
        color: #fff;
    }

    .diagrams-list .new-diagram-button span {
        font-weight: bold;
        margin-top: 15px;
    }
</style>
