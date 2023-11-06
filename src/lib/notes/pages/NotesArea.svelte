<script>
    import Toasts from '../../shared/components/Toasts.svelte';

    import NoteCreationForm from '../components/NoteCreationForm.svelte';
    import Canvas from './../components/Canvas.svelte';

    let notes = [
        {
            id: '2e2b5f22-4149-4410-8691-93844dd2dc4e',
            title: 'Testing title',
            description: '[No description]',
            image: {
                size: 0,
            },
            color: '#E14D45',
            parentId: null,
        },
    ];
</script>

<main>
    <NoteCreationForm bind:notes />
    <section class="notes-area">
        <Canvas bind:notes />
    </section>
</main>

<!-- Toast notifications -->
<Toasts />

<style>
    main {
        display: flex;
    }

    .notes-area {
        flex: 1;
    }
</style>
