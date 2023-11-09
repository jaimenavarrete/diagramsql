<script>
    import ArrowUp from './ArrowUp.svelte';
    import ArrowLeft from './ArrowLeft.svelte';
    import ArrowDown from './ArrowDown.svelte';
    import ArrowRight from './ArrowRight.svelte';

    export let parentNote;
    export let childNote;

    let arrowGap = 60;

    $: parentPoints = {
        top: parentNote.positionY,
        left: parentNote.positionX,
        down: parentNote.positionY + parentNote.height,
        right: parentNote.positionX + parentNote.width,
    };

    $: childPoints = {
        top: childNote.positionY,
        left: childNote.positionX,
        down: childNote.positionY + childNote.height,
        right: childNote.positionX + childNote.width,
    };

    // Child note positions
    $: isUp = childPoints.down < parentPoints.top - arrowGap;
    $: isLeft = childPoints.right < parentPoints.left - arrowGap;
    $: isDown = childPoints.top > parentPoints.down + arrowGap;
    $: isRight = childPoints.left > parentPoints.right + arrowGap;

    $: isNearUp = childPoints.down < parentPoints.top;
    $: isNearLeft = childPoints.right < parentPoints.left;
    $: isNearDown = childPoints.top > parentPoints.down;
    $: isNearRight = childPoints.left > parentPoints.right;
</script>

{#if isUp}
    <ArrowUp {parentNote} {childNote} />
{:else if isDown}
    <ArrowDown {parentNote} {childNote} />
{:else if isLeft}
    <ArrowLeft {parentNote} {childNote} />
{:else if isRight}
    <ArrowRight {parentNote} {childNote} />
{:else if isNearUp}
    <ArrowUp {parentNote} {childNote} isNear={true} />
{:else if isNearDown}
    <ArrowDown {parentNote} {childNote} isNear={true} />
{:else if isNearLeft}
    <ArrowLeft {parentNote} {childNote} isNear={true} />
{:else if isNearRight}
    <ArrowRight {parentNote} {childNote} isNear={true} />
{/if}
