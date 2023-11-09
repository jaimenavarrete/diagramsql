<script>
    import { Router, Route } from 'svelte-routing';
    import DiagramArea from './pages/DiagramArea.svelte';
</script>

<!-- /notes -->
<Router>
    <Route path="/" component={DiagramArea} />
</Router>
