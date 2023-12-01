<script>
    import service from '../services/diagramsService';

    import { onMount } from 'svelte';
    import Toasts from '../../shared/components/Toasts.svelte';
    import { showToast } from '../../shared/components/Toasts.svelte';
    import DiagramAreaHeader from '../components/DiagramAreaHeader.svelte';
    import Canvas from '../components/canvas/Canvas.svelte';
    import DiagramExplorer from '../components/diagram-explorer/DiagramExplorer.svelte';
    import { ElementTypes } from '../../shared/constants/element-types';

    // Props
    export let diagramId;

    // States
    let diagram = {},
        canvasInfo,
        selectedElement = null;

    // Utility functions

    const createTable = () => ({
        id: crypto.randomUUID(),
        type: ElementTypes.Table,
        color: '#212121',
        columns: [],
        relationships: [],
    });

    const createNote = () => ({
        id: crypto.randomUUID(),
        type: ElementTypes.Note,
        color: '#F8F097',
    });

    // Event handlers

    const addTable = async () => {
        const table = createTable();
        diagram.tables = [...diagram.tables, table];
        await service.updateDiagram(diagram);

        selectedElement = table;

        showToast('success', 'Table created successfully');
    };

    const addNote = async () => {
        const note = createNote();
        diagram.notes = [...diagram.notes, note];
        await service.updateDiagram(diagram);

        selectedElement = note;

        showToast('success', 'Note created successfully');
    };

    const updateTitle = async (e) => {
        diagram.title = e.detail.title;
        await service.updateDiagram(diagram);
    };

    const updateDescription = async (e) => {
        diagram.description = e.detail.description;
        await service.updateDiagram(diagram);
    };

    const updateTable = async (e) => {
        const tableIndex = diagram.tables.findIndex(
            (diagram) => diagram.id === e.detail.id
        );
        diagram.tables[tableIndex] = e.detail;

        await service.updateDiagram(diagram);
    };

    const updateNote = async (e) => {
        const noteIndex = diagram.notes.findIndex(
            (diagram) => diagram.id === e.detail.id
        );
        diagram.notes[noteIndex] = e.detail;

        await service.updateDiagram(diagram);
    };

    // Lifecycle hooks

    onMount(async () => {
        diagram = await service.getDiagramById(diagramId);
    });
</script>

<DiagramAreaHeader
    title={diagram.title}
    description={diagram.description}
    on:updateTitle={updateTitle}
    on:updateDescription={updateDescription}
/>

<main>
    <DiagramExplorer
        bind:tables={diagram.tables}
        bind:notes={diagram.notes}
        bind:selectedElement
        bind:canvasInfo
        on:updateTable={updateTable}
        on:updateNote={updateNote}
    />
    <div class="container">
        <Canvas
            bind:canvasInfo
            bind:tables={diagram.tables}
            bind:notes={diagram.notes}
            bind:selectedElement
            on:addTable={addTable}
            on:addNote={addNote}
            on:updateTable={updateTable}
            on:updateNote={updateNote}
        />
    </div>
</main>

<!-- Toast notifications -->
<Toasts />

<!-- Head modifier -->
<svelte:head>
    <title>{diagram.title} | DiagramSQL</title>
</svelte:head>

<style>
    main {
        display: flex;

        height: calc(100vh - 65px);
    }

    .container {
        flex-grow: 1;
    }
</style>
