<script>
    export let parentTable;
    export let childTable;
    export let isNear = false;
    export let color = '#4e4e4e';
    export let isActive = false;

    $: lowestY = Math.min(parentTable.positionY, childTable.positionY);
    $: highestY = Math.max(
        parentTable.positionY + parentTable.height,
        childTable.positionY + childTable.height
    );

    // Arrow size
    $: arrowHeight = highestY - lowestY;
    $: arrowWidth =
        childTable.positionX - (parentTable.positionX + parentTable.width);

    // Arrow positioning
    $: firstLineY = childTable.height / 2 + childTable.positionY - lowestY;
    $: secondLineY = parentTable.height / 2 + parentTable.positionY - lowestY;
    $: linesDistance = Math.abs(firstLineY - secondLineY);

    // Rounded-corners values
    let initialRadius = 10;
    $: radius =
        linesDistance < initialRadius * 2 ? linesDistance / 2 : initialRadius;
    $: side = firstLineY - secondLineY > 0 ? -1 : 1;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    class:is-active={isActive}
    style:top={`${lowestY}px`}
    style:left={`${parentTable.positionX + parentTable.width}px`}
    style:height={`${arrowHeight}px`}
    style:width={`${arrowWidth}px`}
>
    <defs>
        <marker
            id="arrowheadRight"
            markerWidth="6"
            markerHeight="5"
            refX="0"
            refY="2.5"
            fill={color}
        >
            <polygon points="0 0, 6 2.5, 0 5" />
        </marker>
    </defs>

    <path
        d={`M${isNear ? arrowWidth : arrowWidth - 20},${firstLineY}
            L${arrowWidth / 2 + radius},${firstLineY} 
            A${radius},${radius} 0 0 ${side > 0 ? 0 : 1} ${arrowWidth / 2}, ${
            firstLineY + radius * side
        }`}
        stroke={color}
        stroke-width="3"
        marker-start={isNear ? null : 'url(#arrowheadRight)'}
        fill="none"
    />

    <path
        d={`M${arrowWidth / 2},${firstLineY + radius * side}
            L${arrowWidth / 2},${secondLineY - radius * side} 
            A${radius},${radius} 0 0 ${side < 0 ? 0 : 1} ${
            arrowWidth / 2 - radius
        }, ${secondLineY}`}
        stroke={color}
        stroke-width="3"
        fill="none"
    />

    <path
        d={`M${arrowWidth / 2 - radius},${secondLineY} 
            L0,${secondLineY}`}
        stroke={color}
        stroke-width="3"
        fill="none"
    />
</svg>

<style>
    svg {
        position: absolute;
    }

    .is-active {
        filter: drop-shadow(0 0 25px #5865f2);
    }
</style>
