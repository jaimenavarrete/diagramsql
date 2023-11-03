<script>
    import { Router, Route } from 'svelte-routing';
    import NotesArea from './pages/NotesArea.svelte';
</script>

<!-- /notes -->
<Router>
    <Route path="/" component={NotesArea} />
</Router>
