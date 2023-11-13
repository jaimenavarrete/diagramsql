<script>
    import Toasts from '../../shared/components/Toasts.svelte';
    import Canvas from '../components/canvas/Canvas.svelte';

    let tables = [
        {
            id: '2e2b5f22-4149-4410-8691-93844dd2dc4e',
            title: 'Testing table title',
            description: '[No description]',
            color: '#3C90D1',
            parentId: null,
        },
    ];

    let notes = [
        {
            id: '2e2b5f22-4149-4410-8691-93844dd2dc4e',
            title: 'Testing title',
            description: '[No description]',
            image: {
                size: 0,
            },
            color: '#E14D45',
        },
    ];
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
