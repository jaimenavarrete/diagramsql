<script>
    import service from '../services/diagramsService';

    import { onMount } from 'svelte';
    import Header from '../../shared/components/Header.svelte';
    import DiagramListSidebar from '../components/DiagramListSidebar.svelte';
    import DiagramListContent from '../components/diagram-list-content/DiagramListContent.svelte';
    import { navigate } from 'svelte-routing';

    let diagrams = [];

    const addDiagram = async () => {
        const newDiagram = await service.addDiagram();

        navigate(`/diagrams/${newDiagram.id}`);
    };

    const updateFavorite = async (e) => {
        const diagram = diagrams.find((diagram) => diagram.id === e.detail.id);
        diagram.isFavorite = e.detail.isFavorite;

        await service.updateDiagram(diagram);
    };

    const deleteDiagram = async (e) => {
        await service.deleteDiagram(e.detail.id);

        diagrams = diagrams.filter((diagram) => diagram.id !== e.detail.id);
    };

    onMount(async () => {
        diagrams = await service.getDiagrams();
    });
</script>

<Header />

<div class="container">
    <DiagramListSidebar />

    <div class="main-container">
        <DiagramListContent
            {diagrams}
            on:addDiagram={addDiagram}
            on:updateFavorite={updateFavorite}
            on:deleteDiagram={deleteDiagram}
        />
    </div>
</div>

<style>
    .container {
        display: flex;

        height: calc(100vh - 65px);
    }

    .main-container {
        flex-grow: 1;
    }
</style>
