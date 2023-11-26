<script>
    import { IconPlus } from '@tabler/icons-svelte';
</script>

<main>
    <h2>All Diagrams</h2>
    <section class="diagrams-list">
        <article class="new-diagram-button">
            <button
                ><IconPlus size={40} />
                <span>New diagram</span></button
            >
        </article>
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

    .diagrams-list .new-diagram-button {
        height: 300px;
        width: 250px;
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
        transition: 0.1s all;
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
