<script>
    import { Router, Route } from 'svelte-routing';
    import Diagrams from './lib/diagrams/Diagrams.svelte';
</script>

<Router>
    <Route path="/diagrams/*" component={Diagrams} />
    <Route>{location.href}</Route>
</Router>
