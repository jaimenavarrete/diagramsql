<script>
    import Toasts from '../../shared/components/Toasts.svelte';
    import Header from '../../shared/components/header/Header.svelte';
    import Canvas from '../components/canvas/Canvas.svelte';

    let title = 'Untitled diagram';
    let description = 'No description';
    let tables = [];
    let notes = [];
</script>

<Header {title} {description} />

<main>
    <Canvas bind:tables bind:notes />
</main>

<!-- Toast notifications -->
<Toasts />

<style>
    main {
        height: calc(100vh - 65px);
    }
</style>
