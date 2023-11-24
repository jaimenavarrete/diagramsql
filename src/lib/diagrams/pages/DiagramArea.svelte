<script>
    import Toasts from '../../shared/components/Toasts.svelte';
    import { showToast } from '../../shared/components/Toasts.svelte';
    import Header from '../../shared/components/header/Header.svelte';
    import Canvas from '../components/canvas/Canvas.svelte';
    import DiagramExplorer from '../components/diagram-explorer/DiagramExplorer.svelte';
    import { ElementTypes } from '../../shared/constants/element-types';

    let diagram = {
        title: 'Untitled diagram',
        description: 'No description',
        tables: [],
        notes: [],
    };

    export let selectedElement = null;

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

    // Event handlers

    const addTable = () => {
        const table = createTable();
        diagram.tables = [...diagram.tables, table];

        selectedElement = table;

        showToast('success', 'Table created successfully');
    };

    const addNote = () => {
        const note = createNote();
        diagram.notes = [...diagram.notes, note];

        selectedElement = note;

        showToast('success', 'Note created successfully');
    };
</script>

<Header title={diagram.title} description={diagram.description} />

<main>
    <DiagramExplorer
        bind:tables={diagram.tables}
        bind:notes={diagram.notes}
        bind:selectedElement
    />
    <div class="container">
        <Canvas
            bind:tables={diagram.tables}
            bind:notes={diagram.notes}
            bind:selectedElement
            on:addTable={addTable}
            on:addNote={addNote}
        />
    </div>
</main>

<!-- Toast notifications -->
<Toasts />

<style>
    main {
        display: flex;

        height: calc(100vh - 65px);
    }

    .container {
        flex-grow: 1;
    }
</style>
