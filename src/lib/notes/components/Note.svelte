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

    {#if note.title}
        <h3>{note.title}</h3>
    {/if}

    <p>{note.description}</p>
</div>

<svelte:document
    on:mouseup={() => (isNoteGrabbed = false)}
    on:mousemove={moveNote}
/>

<style>
    .note {
        background-color: #f7f18e;
        border-radius: 5px;
        border: 1px solid #ed991d;
        box-shadow: 0 0 25px #21212120;
        color: #4e4e4e;
        cursor: auto;
        max-width: 350px;
        padding: 15px;
        position: absolute;
        z-index: 2;
    }

    img {
        background-color: #fcfcfc;
        border-radius: 5px 5px 0 0;
        height: auto;
        margin-bottom: 15px;
        width: 100%;
    }

    h3 {
        padding-bottom: 15px;
    }

    p {
        margin: 0;
    }
</style>
