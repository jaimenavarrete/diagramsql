<script>
    export let diagram = {};
</script>

<article class="diagram-item">
    <img src="/images/favicon-light.svg" alt="Diagram Logo" />
    <div class="diagram-info">
        <h3>{diagram.title}</h3>
        <small>Edited {diagram.modified}</small>
    </div>
</article>

<style>
    /* Diagram item */

    .diagram-item {
        background-color: #fff;
        border: 1px solid #e4e4e4;
        border-radius: 10px;
    }

    .diagram-item img {
        background-color: #f2f2f2;
        border-radius: 10px 10px 0 0;
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

    .diagram-info small {
        color: #4e4e4e;
        font-size: 0.8em;
    }
</style>
