<script>
    import { Router, Route } from 'svelte-routing';

    import Header from '../shared/components/header/Header.svelte';
    import DiagramArea from './pages/DiagramArea.svelte';
</script>

<Header />

<Router>
    <Route path="/" component={DiagramArea} />
</Router>
