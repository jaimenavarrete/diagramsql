<script>
    import ArrowUp from './ArrowUp.svelte';
    import ArrowLeft from './ArrowLeft.svelte';

    export let parentNote;
    export let childNote;

    let arrowGap = 60;

    $: isChildNoteUp =
        childNote.positionY + childNote.height <
        parentNote.positionY - arrowGap;
    $: isChildNoteLeft =
        childNote.positionX + childNote.width < parentNote.positionX - arrowGap;
</script>

{#if isChildNoteUp}
    <ArrowUp {parentNote} {childNote} />
{:else if isChildNoteLeft}
    <ArrowLeft {parentNote} {childNote} />
{/if}
