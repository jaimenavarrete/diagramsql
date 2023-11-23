<script>
    import Toasts from '../../shared/components/Toasts.svelte';
    import Header from '../../shared/components/header/Header.svelte';
    import Canvas from '../components/canvas/Canvas.svelte';
    import DiagramExplorer from '../components/diagram-explorer/DiagramExplorer.svelte';

    let diagram = {
        title: 'Untitled diagram',
        description: 'No description',
        tables: [],
        notes: [],
    };
</script>

<Header title={diagram.title} description={diagram.description} />

<main>
    <DiagramExplorer tables={diagram.tables} notes={diagram.notes} />
    <div class="container">
        <Canvas bind:tables={diagram.tables} bind:notes={diagram.notes} />
    </div>
</main>

<!-- Toast notifications -->
<Toasts />

<style>
    main {
        display: flex;

        height: calc(100vh - 65px);
    }

    .container {
        flex-grow: 1;
    }
</style>
