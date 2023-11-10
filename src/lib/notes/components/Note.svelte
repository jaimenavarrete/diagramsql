<script>
    import { onMount } from 'svelte';

    export let note;
    export let canvasHeight;
    export let canvasWidth;
    export let zoomRatio;

    let noteRef;
    let imageRef;

    let isNoteGrabbed = false;

    // Utility functions

    const getNoteSize = () => {
        const noteStyles = window.getComputedStyle(noteRef);

        note.width = parseFloat(noteStyles.getPropertyValue('width'));
        note.height = parseFloat(noteStyles.getPropertyValue('height'));
    };

    // Event handler

    const moveNote = (e) => {
        if (!isNoteGrabbed) return;

        e.preventDefault();

        note.positionY += e.movementY / zoomRatio;
        note.positionX += e.movementX / zoomRatio;
    };

    // Lifecycle hook

    onMount(() => {
        note.positionY = canvasHeight / 2;
        note.positionX = canvasWidth / 2;

        if (note.image.size > 0) {
            imageRef.onload = getNoteSize;
            return;
        }

        getNoteSize();
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    bind:this={noteRef}
    on:mousedown|self={() => (isNoteGrabbed = true)}
    class="note"
    style:--note-color={note.color}
    style:top={`${note.positionY}px`}
    style:left={`${note.positionX}px`}
>
    {#if note.image.size > 0}
        <img
            src={URL.createObjectURL(note.image)}
            bind:this={imageRef}
            alt="Note"
            draggable="false"
        />
    {/if}

    <h3>{note.title}</h3>
    <p>{note.description}</p>
</div>

<svelte:document
    on:mouseup={() => (isNoteGrabbed = false)}
    on:mousemove={moveNote}
/>

<style>
    .note {
        background-color: #fff;
        border: 2px solid var(--note-color);
        border-radius: 10px;
        max-width: 300px;
        padding: 15px;
        position: absolute;
        z-index: 2;
    }

    img {
        background-color: #fcfcfc;
        border-radius: 10px;
        height: auto;
        margin-bottom: 15px;
        width: 100%;
    }

    h3 {
        cursor: auto;
        font-size: 1.3rem;
        margin: 0 0 15px 0;
    }

    p {
        cursor: auto;
        color: #4e4e4e;
        margin: 0;
    }
</style>
