<form>
    <h2>Add a new note</h2>
    <input type="text" name="title" placeholder="Title" />
    <textarea
        name="description"
        cols="30"
        rows="10"
        placeholder="Description"
    />
    <input type="file" name="image" />
    <input type="color" name="color" />
    <button>Add note</button>

    <div class="resize-bar" />
</form>

<style>
    form {
        box-shadow: 0 0 3px #7c7c7c;
        padding: 20px;
        position: relative;
        width: 20%;
        z-index: 1;
    }

    form input,
    form textarea {
        border: 1px solid #5865f2;
        border-radius: 5px;
        box-sizing: border-box;
        display: block;
        font-family: 'Poppins', sans-serif, Arial, Helvetica;
        font-size: 15px;
        margin-bottom: 1rem;
        padding: 10px;
        width: 100%;
    }

    form textarea {
        resize: vertical;
    }

    form input[type='file'] {
        border-style: dashed;
        cursor: pointer;
    }

    form input[type='color'] {
        background-color: transparent;
        cursor: pointer;
        padding: 0;
    }

    form button {
        background-color: #5865f2;
        border: none;
        border-radius: 5px;
        color: #fff;
        cursor: pointer;
        font-family: 'Poppins', sans-serif, Arial, Helvetica;
        font-size: 15px;
        font-weight: bold;
        padding: 10px 15px;
        width: 100%;
    }

    form button:hover {
        background-color: #4752c7;
    }

    /*** RESIZE BAR STYLES ***/

    .resize-bar {
        cursor: col-resize;
        position: absolute;
        right: -3px;
        top: 0;
        width: 6px;
        height: 100%;
    }
</style>
