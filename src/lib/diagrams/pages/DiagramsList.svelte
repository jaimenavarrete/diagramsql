<script>
    import Header from '../../shared/components/Header.svelte';
    import DiagramListSidebar from '../components/DiagramListSidebar.svelte';
</script>

<Header />

<main>
    <DiagramListSidebar />
</main>

<style>
    main {
        height: calc(100vh - 65px);

        display: flex;
    }
</style>
