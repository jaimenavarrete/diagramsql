<script>
    export let parentNote;
    export let childNote;

    $: lowestX = Math.min(parentNote.positionX, childNote.positionX);
    $: highestX = Math.max(
        parentNote.positionX + parentNote.width,
        childNote.positionX + childNote.width
    );

    $: arrowWidth = highestX - lowestX;
    $: arrowHeight =
        parentNote.positionY - (childNote.positionY + childNote.height);

    // Arrow positioning
    $: firstLineX = childNote.width / 2 + childNote.positionX - lowestX;
    $: secondLineX = parentNote.width / 2 + parentNote.positionX - lowestX;
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    style:top={`${childNote.positionY + childNote.height}px`}
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
            fill="#5865F2"
        >
            <polygon points="0 0, 6 2.5, 0 5" />
        </marker>
    </defs>

    <line
        x1={firstLineX}
        y1="20"
        x2={firstLineX}
        y2={arrowHeight / 2}
        stroke="#5865F2"
        stroke-width="3"
        marker-start="url(#arrowhead)"
    />

    <line
        x1={firstLineX}
        y1={arrowHeight / 2}
        x2={secondLineX}
        y2={arrowHeight / 2}
        stroke="#5865F2"
        stroke-width="3"
    />

    <line
        x1={secondLineX}
        y1={arrowHeight / 2}
        x2={secondLineX}
        y2={arrowHeight}
        stroke="#5865F2"
        stroke-width="3"
    />
</svg>

<style>
    svg {
        position: absolute;
    }
</style>
