<script>
    import Toasts from '../../shared/components/Toasts.svelte';

    import NoteCreationForm from '../components/NoteCreationForm.svelte';
    import Canvas from './../components/Canvas.svelte';

    let notes = [];
</script>

<main>
    <NoteCreationForm {notes} />
    <section class="notes-area">
        <Canvas />
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
