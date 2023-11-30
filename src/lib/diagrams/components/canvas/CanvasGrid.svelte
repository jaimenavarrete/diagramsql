<script>
    export let canvasInfo;
    export let isGridActive;

    $: gridHeight = canvasInfo.height * canvasInfo.zoomRatio;
    $: gridWidth = canvasInfo.width * canvasInfo.zoomRatio;
    $: gridSize = 100 * canvasInfo.zoomRatio;
    $: subGridSize = 20 * canvasInfo.zoomRatio;
    $: gridMarginTop = (-1 * gridHeight) / 2;
    $: gridMarginLeft = (-1 * gridWidth) / 2;
</script>

<div
    class="canvas-grid-layer"
    style:--grid-size={`${gridSize}px`}
    style:--sub-grid-size={`${subGridSize}px`}
    style:--grid-color={`${isGridActive ? '#e0e0e0' : 'transparent'}`}
    style:--sub-grid-color={`${isGridActive ? '#ebebeb' : 'transparent'}`}
    style:top={canvasInfo.top ? `${canvasInfo.top}px` : null}
    style:left={canvasInfo.left ? `${canvasInfo.left}px` : null}
    style:width="{gridWidth}px"
    style:height="{gridHeight}px"
    style:margin-top="{gridMarginTop}px"
    style:margin-left="{gridMarginLeft}px"
/>

<style>
    .canvas-grid-layer {
        background: repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent calc(var(--grid-size) - 1px),
                var(--grid-color) calc(var(--grid-size) - 1px),
                var(--grid-color) var(--grid-size)
            ),
            repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent calc(var(--sub-grid-size) - 1px),
                var(--sub-grid-color) calc(var(--sub-grid-size) - 1px),
                var(--sub-grid-color) var(--sub-grid-size)
            ),
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent calc(var(--grid-size) - 1px),
                var(--grid-color) calc(var(--grid-size) - 1px),
                var(--grid-color) var(--grid-size)
            ),
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent calc(var(--sub-grid-size) - 1px),
                var(--sub-grid-color) calc(var(--sub-grid-size) - 1px),
                var(--sub-grid-color) var(--sub-grid-size)
            );
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>
