<script>
    import { Router, Route } from 'svelte-routing';

    import DiagramArea from './pages/DiagramArea.svelte';
    import DiagramsList from './pages/DiagramsList.svelte';
</script>

<Router>
    <Route path="/" component={DiagramsList} />
    <Route path="/:id" let:params>
        <DiagramArea diagramId={params.id} />
    </Route>
</Router>
