<script>
    import ArrowUp from './ArrowUp.svelte';
    import ArrowLeft from './ArrowLeft.svelte';
    import ArrowDown from './ArrowDown.svelte';
    import ArrowRight from './ArrowRight.svelte';

    export let parentTable;
    export let childTable;

    let arrowGap = 60;

    $: parentPoints = {
        top: parentTable.positionY,
        left: parentTable.positionX,
        down: parentTable.positionY + parentTable.height,
        right: parentTable.positionX + parentTable.width,
    };

    $: childPoints = {
        top: childTable.positionY,
        left: childTable.positionX,
        down: childTable.positionY + childTable.height,
        right: childTable.positionX + childTable.width,
    };

    // Child table positions
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
    <ArrowUp {parentTable} {childTable} />
{:else if isDown}
    <ArrowDown {parentTable} {childTable} />
{:else if isLeft}
    <ArrowLeft {parentTable} {childTable} />
{:else if isRight}
    <ArrowRight {parentTable} {childTable} />
{:else if isNearUp}
    <ArrowUp {parentTable} {childTable} isNear={true} />
{:else if isNearDown}
    <ArrowDown {parentTable} {childTable} isNear={true} />
{:else if isNearLeft}
    <ArrowLeft {parentTable} {childTable} isNear={true} />
{:else if isNearRight}
    <ArrowRight {parentTable} {childTable} isNear={true} />
{/if}
