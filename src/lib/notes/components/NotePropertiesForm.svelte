<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { IconInfoCircle } from '@tabler/icons-svelte';
    import ElementPropertiesForm from '../../shared/components/element-properties-form/ElementPropertiesForm.svelte';

    // Props
    export let notes;
    export let selectedNote;

    // Call tables state change
    $: selectedNote, (notes = notes);
</script>

<ElementPropertiesForm bind:selectedElement={selectedNote}>
    <svelte:fragment slot="title">Note properties</svelte:fragment>

    <svelte:fragment>
        <section class="form-section">
            <h3><IconInfoCircle /> <span>Information</span></h3>
            <div class="form-control">
                <label for="title">Title</label>
                <input
                    on:input={(e) => {
                        selectedNote.title = e.currentTarget.value;
                    }}
                    on:focusout={() => dispatch('updateNote', selectedNote)}
                    type="text"
                    id="title"
                    placeholder="To Do"
                    value={selectedNote?.title || null}
                />
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea
                    on:input={(e) => {
                        selectedNote.description = e.currentTarget.value;
                    }}
                    on:focusout={() => dispatch('updateNote', selectedNote)}
                    id="description"
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Assign relationships"
                    value={selectedNote?.description || null}
                />
            </div>
            <div class="form-control">
                <label for="color">Pick a color</label>
                <input
                    on:input={(e) => {
                        selectedNote.color = e.currentTarget.value;
                    }}
                    on:change={() => dispatch('updateNote', selectedNote)}
                    type="color"
                    id="color"
                    name="color"
                    value={selectedNote?.color || null}
                />
            </div>
        </section>
    </svelte:fragment>
</ElementPropertiesForm>

<style>
    label {
        color: #4752c7;
        display: block;
        font-weight: bold;
        font-size: 0.85em;
        margin-bottom: 5px;
    }

    input,
    textarea {
        background: #f2f2f2;
        border: 1px solid #e4e4e4;
        border-radius: 5px;
        display: block;
        font-size: 15px;
        margin-bottom: 20px;
        padding: 10px;
        width: 100%;
    }

    input:focus,
    textarea:focus {
        outline-color: #4752c7;
    }

    textarea {
        resize: vertical;
    }

    input[type='color'] {
        background-color: transparent;
        cursor: pointer;
        padding: 0;
    }
</style>
