<script>
    import { Router, Route, navigate } from 'svelte-routing';
    import Diagrams from './lib/diagrams/Diagrams.svelte';

    if (location.pathname === '/') {
        navigate('/diagrams/', { replace: true });
    }
</script>

<Router>
    <Route path="/diagrams/*" component={Diagrams} />
    <Route>{location.href}</Route>
</Router>
