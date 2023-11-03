<div id="canvas-container" class="canvas-container">
    <div id="canvas-grid-layer" />
    <div id="canvas" />
    <div class="zoom-buttons">
        <button id="reset-position-button">&#9872;</button>
        <button id="increase-zoom-button">&plus;</button>
        <button id="reset-zoom-button">100%</button>
        <button id="decrease-zoom-button">&dash;</button>
    </div>
</div>

<style>
    /* CANVAS BUTTONS STYLES */

    .zoom-buttons {
        position: absolute;
        right: 1.5rem;
        bottom: 1.5rem;
        -webkit-user-select: none;
        user-select: none;
    }

    .zoom-buttons button {
        background: white;
        border: 1px solid #4752c7;
        border-radius: 5px;
        color: #4752c7;
        cursor: pointer;
        font-size: 25px;
        font-weight: bold;
        margin: 0 2px;
        padding: 5px 15px;
        vertical-align: middle;
    }

    .zoom-buttons button:hover {
        background-color: #4752c7;
        color: #f2f2f2;
    }

    .zoom-buttons #reset-position-button {
        cursor: default;
        opacity: 0;
        transition: all 0.2s ease-out;
    }

    .zoom-buttons #reset-position-button:is(.active) {
        cursor: pointer;
        opacity: 1;
    }

    .zoom-buttons #reset-zoom-button {
        font-size: 20px;
        padding: 8px 15px;
    }

    /* CANVAS STYLES */

    .canvas-container {
        background-color: #fcfcfc;
        height: 100vh;
        overflow: hidden;
        position: relative;
        width: 100%;
    }

    .canvas-container #canvas {
        box-shadow: 0 0 3px #7c7c7c;
        height: 3500px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1750px;
        margin-left: -3000px;
        width: 6000px;
    }

    .canvas-container #canvas-grid-layer {
        --grid-color: rgba(0, 0, 0, 0.12);
        --grid-size: 60px;

        --sub-grid-color: rgba(0, 0, 0, 0.07);
        --sub-grid-size: 12px;

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
        height: 3500px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1750px;
        margin-left: -3000px;
        width: 6000px;
    }
</style>
