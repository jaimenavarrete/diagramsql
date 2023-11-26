<script>
    import Header from '../../shared/components/Header.svelte';
    import DiagramListSidebar from '../components/DiagramListSidebar.svelte';
    import DiagramListContent from '../components/diagram-list-content/DiagramListContent.svelte';
</script>

<Header />

<div class="container">
    <DiagramListSidebar />

    <div class="main-container">
        <DiagramListContent />
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
