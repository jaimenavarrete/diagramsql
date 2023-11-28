<script>
    import service from '../services/diagramsService';

    import { onMount } from 'svelte';
    import Header from '../../shared/components/Header.svelte';
    import DiagramListSidebar from '../components/DiagramListSidebar.svelte';
    import DiagramListContent from '../components/diagram-list-content/DiagramListContent.svelte';

    let diagrams = [];

    onMount(async () => {
        diagrams = await service.getDiagrams();
    });
</script>

<Header />

<div class="container">
    <DiagramListSidebar />

    <div class="main-container">
        <DiagramListContent {diagrams} />
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
