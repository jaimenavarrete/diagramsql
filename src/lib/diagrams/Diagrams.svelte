<script>
    import { Router, Route } from 'svelte-routing';

    import DiagramArea from './pages/DiagramArea.svelte';
    import DiagramsList from './pages/DiagramsList.svelte';
</script>

<Router>
    <Route path="/" component={DiagramsList} />
    <Route path="/diagram" component={DiagramArea} />
</Router>
