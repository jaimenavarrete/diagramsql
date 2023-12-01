<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { onMount } from 'svelte';
    import { contrastBackgroundColor } from '../../shared/utilities/text-utilities';

    export let canvasInfo;
    export let note;
    export let selectedElement;

    let noteRef;
    let noteStyles;

    let isNoteGrabbed = false;
    $: note, (note.width = getStyleValue('width'));
    $: note, (note.height = getStyleValue('height'));

    // Utility functions

    const getStyleValue = (property) =>
        parseFloat(noteStyles?.getPropertyValue(property));

    const setNotePositionValues = () => {
        if (note.positionX && note.positionY) return;

        const deltaTop =
            (canvasInfo.containerHeight / 2 - canvasInfo.top) /
            canvasInfo.zoomRatio;
        const deltaLeft =
            (canvasInfo.containerWidth / 2 - canvasInfo.left) /
            canvasInfo.zoomRatio;

        note.positionY = (canvasInfo.height - note.height) / 2 + deltaTop;
        note.positionX = (canvasInfo.width - note.width) / 2 + deltaLeft;

        // Update note to save initial position values
        dispatch('updateNote', note);
    };

    // Event handler

    const selectNote = () => (selectedElement = note);

    const moveNote = (e) => {
        if (!isNoteGrabbed) return;

        e.preventDefault();

        note.positionY += e.movementY / canvasInfo.zoomRatio;
        note.positionX += e.movementX / canvasInfo.zoomRatio;
    };

    const dropNote = () => {
        if (!isNoteGrabbed) return;

        isNoteGrabbed = false;

        dispatch('updateNote', note);
    };

    // Lifecycle hook

    onMount(() => {
        noteStyles = window.getComputedStyle(noteRef);

        note.height = getStyleValue('height');
        note.width = getStyleValue('width');

        setNotePositionValues();
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

<svelte:document on:mouseup={dropNote} on:mousemove={moveNote} />

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
