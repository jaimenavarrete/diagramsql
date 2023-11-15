<script>
    import { showToast } from '../../../../shared/components/Toasts.svelte';
    import {
        IconArrowBackUp,
        IconArrowForwardUp,
        IconNote,
        IconTablePlus,
    } from '@tabler/icons-svelte';

    export let tables;
    export let selectedTable;

    // Utility functions

    const createTable = () => ({
        id: crypto.randomUUID(),
        name: null,
        description: null,
        color: '#000000',
        columns: [],
        relationships: [],
        parentId: null,
    });

    // Event Handlers

    const addTable = () => {
        const table = createTable();
        tables = [...tables, table];

        selectedTable = table;

        showToast('success', 'The table was created successfully');
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
