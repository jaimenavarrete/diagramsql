<script>
    import Toasts from '../../shared/components/Toasts.svelte';
    import Header from '../../shared/components/header/Header.svelte';
    import Canvas from '../components/canvas/Canvas.svelte';
    import DiagramExplorer from '../components/diagram-explorer/DiagramExplorer.svelte';

    let title = 'Untitled diagram';
    let description = 'No description';
    let tables = [];
    let notes = [];
</script>

<Header {title} {description} />

<main>
    <DiagramExplorer />
    <div class="container">
        <Canvas bind:tables bind:notes />
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
