<script>
    import { createEventDispatcher } from 'svelte';
    import {
        IconArrowBackUp,
        IconArrowForwardUp,
        IconNote,
        IconTablePlus,
    } from '@tabler/icons-svelte';

    const dispatch = createEventDispatcher();

    // Event Handlers

    const addTable = () => dispatch('addTable', {});

    const addNote = () => dispatch('addNote', {});
</script>

<section class="canvas-buttons">
    <div class="buttons-container">
        <button class="undo-button" title="Undo operation"
            ><IconArrowBackUp size={20} /></button
        >
        <button class="redo-button" title="Redo operation"
            ><IconArrowForwardUp size={20} />
        </button>
    </div>
    <div class="buttons-container">
        <button on:click={addTable} class="add-table-button" title="Add table"
            ><IconTablePlus size={20} /></button
        >
        <button on:click={addNote} class="add-note-button" title="Add note"
            ><IconNote size={20} /></button
        >
    </div>
</section>

<style>
    .canvas-buttons {
        margin-left: -115px;
        left: 50%;
        top: 1rem;
    }
</style>
