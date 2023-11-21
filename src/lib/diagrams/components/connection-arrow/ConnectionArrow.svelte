<script>
    import ArrowUp from './ArrowUp.svelte';
    import ArrowLeft from './ArrowLeft.svelte';
    import ArrowDown from './ArrowDown.svelte';
    import ArrowRight from './ArrowRight.svelte';

    export let parentTable;
    export let childTable;
    export let hoveredTable;
    export let selectedElement;

    let arrowGap = 60;

    $: hasHoveredTable =
        parentTable === hoveredTable || childTable === hoveredTable;
    $: hasSelectedTable =
        parentTable === selectedElement || childTable === selectedElement;
    $: isActive = hasHoveredTable || hasSelectedTable;
    $: color = isActive ? '#5865F2' : '#4e4e4e';

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
    <ArrowUp {parentTable} {childTable} {color} {isActive} />
{:else if isDown}
    <ArrowDown {parentTable} {childTable} {color} {isActive} />
{:else if isLeft}
    <ArrowLeft {parentTable} {childTable} {color} {isActive} />
{:else if isRight}
    <ArrowRight {parentTable} {childTable} {color} {isActive} />
{:else if isNearUp}
    <ArrowUp {parentTable} {childTable} isNear={true} {color} {isActive} />
{:else if isNearDown}
    <ArrowDown {parentTable} {childTable} isNear={true} {color} {isActive} />
{:else if isNearLeft}
    <ArrowLeft {parentTable} {childTable} isNear={true} {color} {isActive} />
{:else if isNearRight}
    <ArrowRight {parentTable} {childTable} isNear={true} {color} {isActive} />
{/if}
