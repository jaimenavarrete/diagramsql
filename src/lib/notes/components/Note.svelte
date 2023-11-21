<script>
    import { onMount } from 'svelte';

    export let note;
    export let canvasHeight;
    export let canvasWidth;
    export let zoomRatio;
    export let selectedNote;

    let isNoteGrabbed = false;

    // Event handler

    const selectNote = () => (selectedNote = note);

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
    });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mousedown|self={() => (isNoteGrabbed = true)}
    class="note"
    style:--note-color={note.color}
    style:top={`${note.positionY}px`}
    style:left={`${note.positionX}px`}
    class:selected-note={note === selectedNote}
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
        background-color: #f7f18e;
        border-radius: 5px;
        box-shadow: 0 0 25px #21212120;
        border: 1px solid #21212120;
        color: #4e4e4e;
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
