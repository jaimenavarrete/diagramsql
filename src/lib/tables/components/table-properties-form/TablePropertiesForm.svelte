<script>
    import { IconInfoCircle } from '@tabler/icons-svelte';

    import ColumnsSection from './ColumnsSection.svelte';
    import RelationshipsSection from './RelationshipsSection.svelte';
    import ElementPropertiesForm from '../../../shared/components/element-properties-form/ElementPropertiesForm.svelte';

    export let tables;
    export let selectedTable;

    // Call tables state change
    $: selectedTable, (tables = tables);

    // Element references
    let focusedElementRef;

    // Reactive variables
    $: selectedTableId = selectedTable?.id;
    $: selectedTableId, focusedElementRef?.focus();
</script>

<ElementPropertiesForm bind:selectedElement={selectedTable}>
    <svelte:fragment slot="title">Table properties</svelte:fragment>

    <svelte:fragment>
        <section class="form-section">
            <h3><IconInfoCircle /> <span>Information</span></h3>
            <div class="form-control">
                <label for="name">Name</label>
                <input
                    bind:this={focusedElementRef}
                    on:input={(e) => {
                        selectedTable.name = e.currentTarget.value;
                    }}
                    type="text"
                    id="name"
                    placeholder="Users"
                    value={selectedTable?.name || null}
                />
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea
                    on:input={(e) => {
                        selectedTable.description = e.currentTarget.value;
                    }}
                    id="description"
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Registered users"
                    value={selectedTable?.description || null}
                />
            </div>
            <div class="form-control">
                <label for="color">Pick a color</label>
                <input
                    on:input={(e) => {
                        selectedTable.color = e.currentTarget.value;
                    }}
                    type="color"
                    id="color"
                    name="color"
                    value={selectedTable?.color || null}
                />
            </div>
        </section>
        <ColumnsSection bind:selectedTable />
        <RelationshipsSection bind:tables bind:selectedTable />
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
