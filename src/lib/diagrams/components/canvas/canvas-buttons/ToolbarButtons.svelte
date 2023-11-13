<script>
    import {
        IconArrowBackUp,
        IconArrowForwardUp,
        IconNote,
        IconTablePlus,
    } from '@tabler/icons-svelte';

    export let isTableFormActive = false;
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
        <button
            on:click={() => (isTableFormActive = true)}
            class="add-table-button"
            title="Add table"><IconTablePlus size={20} /></button
        >
        <button class="add-note-button" title="Add note"
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
