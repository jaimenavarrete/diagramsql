<script>
    import { onMount } from 'svelte';
    import { contrastBackgroundColor } from '../../shared/utilities/text-utilities';

    export let note;
    export let selectedElement;

    export let canvasHeight;
    export let canvasWidth;
    export let zoomRatio;

    let noteRef;
    let noteStyles;

    let isNoteGrabbed = false;
    $: note, (note.width = getStyleValue('width'));
    $: note, (note.height = getStyleValue('height'));

    // Utility functions
    const getStyleValue = (property) =>
        parseFloat(noteStyles?.getPropertyValue(property));

    // Event handler

    const selectNote = () => (selectedElement = note);

    const moveNote = (e) => {
        if (!isNoteGrabbed) return;

        e.preventDefault();

        note.positionY += e.movementY / zoomRatio;
        note.positionX += e.movementX / zoomRatio;
    };

    // Lifecycle hook

    onMount(() => {
        noteStyles = window.getComputedStyle(noteRef);

        note.height = getStyleValue('height');
        note.width = getStyleValue('width');
        note.positionY = (canvasHeight - note.height) / 2;
        note.positionX = (canvasWidth - note.width) / 2;
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    bind:this={noteRef}
    on:mousedown|self={() => (isNoteGrabbed = true)}
    class="note"
    style:--note-color={note.color}
    style:--text-color={contrastBackgroundColor(note.color)}
    style:top={`${note.positionY}px`}
    style:left={`${note.positionX}px`}
    class:selected-note={note === selectedElement}
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={selectNote}>
        {#if note.title}
            <h3>{note.title}</h3>
        {/if}

        <p class:no-description-text={!note.description}>
            {note.description || 'No description'}
        </p>
    </div>
</div>

<svelte:document
    on:mouseup={() => (isNoteGrabbed = false)}
    on:mousemove={moveNote}
/>

<style>
    .note {
        background-color: var(--note-color);
        border-radius: 5px;
        box-shadow: 0 0 25px #21212120;
        border: 1px solid #212121;
        color: var(--text-color);
        cursor: move;
        max-width: 350px;
        padding: 20px;
        position: absolute;
        z-index: 2;
    }

    .selected-note {
        border-color: #4752c7;
        box-shadow: 0 0 25px #4752c775;
    }

    h3 {
        cursor: pointer;
        padding-bottom: 15px;
    }

    p {
        cursor: pointer;
        margin: 0;
    }

    .no-description-text {
        color: #b3b3b3;
    }
</style>
