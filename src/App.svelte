<script>
    import { Router, Route } from 'svelte-routing';
    import Notes from './lib/notes/Notes.svelte';
</script>

<Router>
    <Route path="/notes/*" component={Notes} />
    <Route>{location.href}</Route>
</Router>
