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

    const updateTitle = async (e) => {
        diagram.title = e.detail.title;
        await service.updateDiagram(diagram);
    };

    const updateDescription = async (e) => {
        diagram.description = e.detail.description;
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
    />
    <div class="container">
        <Canvas
            bind:canvasInfo
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
