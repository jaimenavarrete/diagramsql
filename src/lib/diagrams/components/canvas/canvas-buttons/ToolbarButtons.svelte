<script>
    import { showToast } from '../../../../shared/components/Toasts.svelte';
    import {
        IconArrowBackUp,
        IconArrowForwardUp,
        IconNote,
        IconTablePlus,
    } from '@tabler/icons-svelte';
    import { ElementTypes } from '../../../../shared/constants/element-types';

    export let tables;
    export let notes;
    export let selectedElement;

    // Utility functions

    const createTable = () => ({
        id: crypto.randomUUID(),
        type: ElementTypes.Table,
        color: '#000000',
        columns: [],
        relationships: [],
    });

    const createNote = () => ({
        id: crypto.randomUUID(),
        type: ElementTypes.Note,
        color: '#F8F097',
    });

    // Event Handlers

    const addTable = () => {
        const table = createTable();
        tables = [...tables, table];

        selectedElement = table;

        showToast('success', 'Table created successfully');
    };

    const addNote = () => {
        const note = createNote();
        notes = [...notes, note];

        selectedElement = note;

        showToast('success', 'Note created successfully');
    };
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
