<script>
    export let parentNote;
    export let childNote;
    export let isNear = false;

    $: lowestX = Math.min(parentNote.positionX, childNote.positionX);
    $: highestX = Math.max(
        parentNote.positionX + parentNote.width,
        childNote.positionX + childNote.width
    );

    // Arrow size
    $: arrowWidth = highestX - lowestX;
    $: arrowHeight =
        childNote.positionY - (parentNote.positionY + parentNote.height);

    // Arrow positioning
    $: firstLineX = childNote.width / 2 + childNote.positionX - lowestX;
    $: secondLineX = parentNote.width / 2 + parentNote.positionX - lowestX;
    $: linesDistance = Math.abs(firstLineX - secondLineX);

    // Rounded-corners values
    let initialRadius = 10;
    $: radius =
        linesDistance < initialRadius * 2 ? linesDistance / 2 : initialRadius;
    $: side = firstLineX - secondLineX > 0 ? -1 : 1;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    style:top={`${parentNote.positionY + parentNote.height}px`}
    style:left={`${lowestX}px`}
    style:height={`${arrowHeight}px`}
    style:width={`${arrowWidth}px`}
>
    <defs>
        <marker
            id="arrowheadDown"
            markerWidth="6"
            markerHeight="5"
            refX="0"
            refY="2.5"
            orient="90deg"
            fill="#5865F2"
        >
            <polygon points="0 0, 6 2.5, 0 5" />
        </marker>
    </defs>

    <path
        d={`M${firstLineX},${isNear ? arrowHeight : arrowHeight - 20}
            L${firstLineX},${arrowHeight / 2 + radius} 
            A${radius},${radius} 0 0 ${side < 0 ? 0 : 1} ${
            firstLineX + radius * side
        },${arrowHeight / 2}`}
        stroke="#5865F2"
        stroke-width="3"
        marker-start={isNear ? null : 'url(#arrowheadDown)'}
        fill="none"
    />

    <path
        d={`M${firstLineX + radius * side},${arrowHeight / 2}
            L${secondLineX - radius * side},${arrowHeight / 2} 
            A${radius},${radius} 0 0 ${side > 0 ? 0 : 1} ${secondLineX},${
            arrowHeight / 2 - radius
        }`}
        stroke="#5865F2"
        stroke-width="3"
        fill="none"
    />

    <path
        d={`M${secondLineX},${arrowHeight / 2 - radius}
            L${secondLineX},0`}
        stroke="#5865F2"
        stroke-width="3"
        fill="none"
    />
</svg>

<style>
    svg {
        position: absolute;
    }
</style>
