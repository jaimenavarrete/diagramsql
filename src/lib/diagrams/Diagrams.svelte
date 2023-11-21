<script>
    import { Router, Route } from 'svelte-routing';

    import DiagramArea from './pages/DiagramArea.svelte';
</script>

<Router>
    <Route path="/" component={DiagramArea} />
</Router>
