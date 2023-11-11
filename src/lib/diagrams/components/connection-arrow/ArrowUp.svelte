<script>
    export let parentTable;
    export let childTable;
    export let isNear = false;
    export let color = '#4e4e4e';

    $: lowestX = Math.min(parentTable.positionX, childTable.positionX);
    $: highestX = Math.max(
        parentTable.positionX + parentTable.width,
        childTable.positionX + childTable.width
    );

    // Arrow size
    $: arrowWidth = highestX - lowestX;
    $: arrowHeight =
        parentTable.positionY - (childTable.positionY + childTable.height);

    // Arrow positioning
    $: firstLineX = childTable.width / 2 + childTable.positionX - lowestX;
    $: secondLineX = parentTable.width / 2 + parentTable.positionX - lowestX;
    $: linesDistance = Math.abs(firstLineX - secondLineX);

    // Rounded-corners values
    let initialRadius = 10;
    $: radius =
        linesDistance < initialRadius * 2 ? linesDistance / 2 : initialRadius;
    $: side = firstLineX - secondLineX > 0 ? -1 : 1;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    style:top={`${childTable.positionY + childTable.height}px`}
    style:left={`${lowestX}px`}
    style:height={`${arrowHeight}px`}
    style:width={`${arrowWidth}px`}
>
    <defs>
        <marker
            id="arrowhead"
            markerWidth="6"
            markerHeight="5"
            refX="0"
            refY="2.5"
            orient="-90deg"
            fill={color}
        >
            <polygon points="0 0, 6 2.5, 0 5" />
        </marker>
    </defs>

    <path
        d={`M${firstLineX},${isNear ? '0' : '20'}
            L${firstLineX},${arrowHeight / 2 - radius} 
            A${radius},${radius} 0 0 ${side > 0 ? 0 : 1} ${
            firstLineX + radius * side
        },${arrowHeight / 2}`}
        stroke={color}
        stroke-width="3"
        marker-start={isNear ? null : 'url(#arrowhead)'}
        fill="none"
    />

    <path
        d={`M${firstLineX + radius * side},${arrowHeight / 2}
            L${secondLineX - radius * side},${arrowHeight / 2} 
            A${radius},${radius} 0 0 ${side < 0 ? 0 : 1} ${secondLineX},${
            arrowHeight / 2 + radius
        }`}
        stroke={color}
        stroke-width="3"
        fill="none"
    />

    <path
        d={`M${secondLineX},${arrowHeight / 2 + radius}
            L${secondLineX},${arrowHeight}`}
        stroke={color}
        stroke-width="3"
        fill="none"
    />
</svg>

<style>
    svg {
        position: absolute;
    }
</style>
