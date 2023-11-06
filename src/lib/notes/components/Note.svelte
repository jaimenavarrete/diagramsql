<script>
    export let note;
    export let zoomRatio;

    let isNoteGrabbed = false;

    const moveNote = (e) => {
        if (!isNoteGrabbed) return;

        e.preventDefault();

        note.positionY += e.movementY / zoomRatio;
        note.positionX += e.movementX / zoomRatio;
    };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mousedown|self={() => (isNoteGrabbed = true)}
    class="note"
    style:--note-color={note.color}
    style:top={`${note.positionY}px`}
    style:left={`${note.positionX}px`}
>
    {#if note.image.size > 0}
        <img
            src={URL.createObjectURL(note.image)}
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
        border-top: 5px solid var(--note-color);
        border-radius: 10px;
        box-shadow: 0 0 2px var(--note-color);
        max-width: 300px;
        padding: 15px;
        position: absolute;
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
