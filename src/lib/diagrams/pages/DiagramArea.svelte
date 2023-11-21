<script>
    import Toasts from '../../shared/components/Toasts.svelte';
    import Canvas from '../components/canvas/Canvas.svelte';

    let tables = [];
    let notes = [];
</script>

<main>
    <Canvas bind:tables bind:notes />
</main>

<!-- Toast notifications -->
<Toasts />

<style>
    main {
        height: 95vh;
    }
</style>
