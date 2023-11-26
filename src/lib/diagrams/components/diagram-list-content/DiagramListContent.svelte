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

        <article class="diagram-item">
            <img src="/images/favicon-light.svg" alt="Diagram Logo" />
            <div class="diagram-info">
                <h3>My first diagram</h3>
                <small>Edited today</small>
            </div>
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

    /* Diagram item */

    .diagrams-list .diagram-item {
        background-color: #fff;
        border: 1px solid #e4e4e4;
        border-radius: 10px;
    }

    .diagrams-list .diagram-item img {
        background-color: #f2f2f2;
        border-radius: 10px 10px 0 0;
        display: block;
        height: auto;
        width: 100%;
    }

    .diagrams-list .diagram-item .diagram-info {
        padding: 10px;
    }

    .diagrams-list .diagram-item h3 {
        font-size: 1em;
    }

    .diagrams-list .diagram-item small {
        color: #4e4e4e;
        font-size: 0.8em;
    }
</style>
