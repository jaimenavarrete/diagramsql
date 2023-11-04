<script>
    import NoteCreationForm from '../components/NoteCreationForm.svelte';
    import Canvas from './../components/Canvas.svelte';
</script>

<main>
    <NoteCreationForm />
    <section class="notes-area">
        <Canvas />
    </section>
</main>

<style>
    main {
        display: flex;
    }

    .notes-area {
        flex: 1;
    }
</style>
