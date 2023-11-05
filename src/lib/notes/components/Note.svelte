<script>
    export let note;
</script>

<div
    class="note"
    draggable="true"
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

<style>
    .note {
        background-color: #fff;
        border-top: 5px solid var(--note-color);
        border-radius: 10px;
        box-shadow: 0 0 2px var(--note-color);
        padding: 15px;
        position: absolute;
        max-width: 300px;
    }

    img {
        background-color: #fcfcfc;
        border-radius: 10px;
        height: auto;
        margin-bottom: 15px;
        width: 100%;
    }

    h3 {
        font-size: 1.3rem;
        margin: 0 0 15px 0;
    }

    p {
        color: #4e4e4e;
        margin: 0;
    }
</style>
