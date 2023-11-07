<script>
    import ArrowUp from './ArrowUp.svelte';
    import ArrowLeft from './ArrowLeft.svelte';
    import ArrowDown from './ArrowDown.svelte';
    import ArrowRight from './ArrowRight.svelte';

    export let parentNote;
    export let childNote;

    let arrowGap = 60;

    $: isChildNoteUp =
        childNote.positionY + childNote.height <
        parentNote.positionY - arrowGap;

    $: isChildNoteLeft =
        childNote.positionX + childNote.width < parentNote.positionX - arrowGap;

    $: isChildNoteDown =
        childNote.positionY >
        parentNote.positionY + parentNote.height + arrowGap;

    $: isChildNoteRight =
        childNote.positionX >
        parentNote.positionX + parentNote.width + arrowGap;
</script>

{#if isChildNoteUp}
    <ArrowUp {parentNote} {childNote} />
{:else if isChildNoteDown}
    <ArrowDown {parentNote} {childNote} />
{:else if isChildNoteLeft}
    <ArrowLeft {parentNote} {childNote} />
{:else if isChildNoteRight}
    <ArrowRight {parentNote} {childNote} />
{/if}
