<script>
    export let parentNote;
    export let childNote;
    export let isNear = false;

    $: lowestY = Math.min(parentNote.positionY, childNote.positionY);
    $: highestY = Math.max(
        parentNote.positionY + parentNote.height,
        childNote.positionY + childNote.height
    );

    // Arrow size
    $: arrowHeight = highestY - lowestY;
    $: arrowWidth =
        parentNote.positionX - (childNote.positionX + childNote.width);

    // Arrow positioning
    $: firstLineY = childNote.height / 2 + childNote.positionY - lowestY;
    $: secondLineY = parentNote.height / 2 + parentNote.positionY - lowestY;
    $: linesDistance = Math.abs(firstLineY - secondLineY);

    // Rounded-corners values
    let initialRadius = 10;
    $: radius =
        linesDistance < initialRadius * 2 ? linesDistance / 2 : initialRadius;
    $: side = firstLineY - secondLineY > 0 ? -1 : 1;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    style:top={`${lowestY}px`}
    style:left={`${childNote.positionX + childNote.width}px`}
    style:height={`${arrowHeight}px`}
    style:width={`${arrowWidth}px`}
>
    <defs>
        <marker
            id="arrowheadLeft"
            markerWidth="6"
            markerHeight="5"
            refX="0"
            refY="2.5"
            orient="-180deg"
            fill="#5865F2"
        >
            <polygon points="0 0, 6 2.5, 0 5" />
        </marker>
    </defs>

    <path
        d={`M${isNear ? 0 : 20},${firstLineY}
            L${arrowWidth / 2 - radius},${firstLineY} 
            A${radius},${radius} 0 0 ${side < 0 ? 0 : 1} ${arrowWidth / 2}, ${
            firstLineY + radius * side
        }`}
        stroke="#5865F2"
        stroke-width="3"
        marker-start={isNear ? null : 'url(#arrowheadLeft)'}
        fill="none"
    />

    <path
        d={`M${arrowWidth / 2},${firstLineY + radius * side}
            L${arrowWidth / 2},${secondLineY - radius * side} 
            A${radius},${radius} 0 0 ${side > 0 ? 0 : 1} ${
            arrowWidth / 2 + radius
        }, ${secondLineY}`}
        stroke="#5865F2"
        stroke-width="3"
        fill="none"
    />

    <path
        d={`M${arrowWidth / 2 + radius},${secondLineY} 
            L${arrowWidth},${secondLineY}`}
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
