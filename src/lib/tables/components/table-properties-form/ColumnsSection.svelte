<script>
    import {
        IconCircleLetterC,
        IconCircleLetterN,
        IconCircleLetterU,
        IconColumns,
        IconColumnsOff,
        IconKey,
        IconPlus,
        IconTrash,
    } from '@tabler/icons-svelte';

    // Props
    export let selectedTable;

    // Event handlers

    const addColumn = () => {
        const newColumn = {
            id: crypto.randomUUID(),
            isPrimaryKey: false,
            isNullable: false,
            isUnique: false,
        };

        selectedTable.columns = [...selectedTable.columns, newColumn];
    };

    const deleteColumn = (id) => {
        selectedTable.columns = selectedTable.columns.filter(
            (column) => column.id !== id
        );
    };
</script>

<section class="form-section">
    <h3><IconColumns /> <span>Columns</span></h3>

    {#if !selectedTable?.columns || selectedTable.columns.length === 0}
        <p class="no-columns-text">
            <IconColumnsOff size={32} /><span>You have no columns here.</span>
        </p>
    {:else}
        {#each selectedTable.columns as column}
            <article class="column-control">
                <input
                    on:input={(e) => {
                        column.name = e.currentTarget.value;
                    }}
                    type="text"
                    placeholder="Name"
                    value={column.name || null}
                />
                <input
                    on:input={(e) => {
                        column.type = e.currentTarget.value;
                    }}
                    type="text"
                    id="column-type"
                    placeholder="Type"
                    value={column.type || null}
                />
                <label class="checkbox is-primary-key" title="Primary Key">
                    <input
                        on:change={(e) => {
                            column.isPrimaryKey = e.currentTarget.checked;
                        }}
                        type="checkbox"
                        value={column.isPrimaryKey}
                    />
                    <button type="button"><IconKey /></button>
                </label>

                <!-- Show constraints button -->
                <label class="checkbox constraints-button" title="Constraints">
                    <input type="checkbox" />
                    <button type="button"><IconCircleLetterC /></button>

                    <div class="constraints-container">
                        <label class="checkbox is-nullable" title="Nullable">
                            <input
                                on:change={(e) => {
                                    column.isNullable = e.currentTarget.checked;
                                }}
                                type="checkbox"
                                value={column.isNullable}
                            />
                            <button type="button"><IconCircleLetterN /></button>
                        </label>
                        <label class="checkbox is-unique" title="Unique">
                            <input
                                on:change={(e) => {
                                    column.isUnique = e.currentTarget.checked;
                                }}
                                type="checkbox"
                                value={column.isUnique}
                            />
                            <button type="button"><IconCircleLetterU /></button>
                        </label>
                    </div>
                </label>

                <!-- Delete button -->
                <div
                    class="checkbox delete-column-button"
                    title="Delete column"
                >
                    <button
                        on:click={() => deleteColumn(column.id)}
                        type="button"
                    >
                        <IconTrash /></button
                    >
                </div>
            </article>
        {/each}
    {/if}

    <div class="form-control add-column-button">
        <span>N° of columns: {selectedTable?.columns.length}</span>
        <button on:click={addColumn}><IconPlus size={22} /> Add column</button>
    </div>
</section>

<style>
    input {
        background: #f2f2f2;
        border: 1px solid #e4e4e4;
        border-radius: 5px;
        width: 100%;
    }

    input:focus {
        outline-color: #4752c7;
    }

    button {
        background: transparent;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 10px 20px;
    }

    .add-column-button {
        border-top: 1px solid #f2f2f2;
        margin-top: 20px;
        padding-top: 5px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .add-column-button span {
        color: #4e4e4e;
        font-size: 14px;
    }

    .add-column-button button {
        border: 2px dashed transparent;
        color: #5865f2;
        font-size: 15px;

        font-weight: bold;
        padding: 7px 15px;
        transition: all 0.1s ease-out;
    }

    .add-column-button button:hover {
        background-color: #4752c720;
        border-color: #4752c7;
    }

    /* Empty columns text */
    .no-columns-text {
        color: #4e4e4e;
        font-size: 0.9em;
        text-align: center;
    }

    .no-columns-text span {
        display: block;
    }

    /*** COLUMNS STYLES ***/

    .column-control {
        margin-bottom: 7px;

        display: flex;
    }

    .column-control input {
        font-size: 14px;
        margin: 0 2px;
        padding: 0 10px;
    }

    .column-control .checkbox {
        cursor: pointer;
    }

    .column-control .checkbox input {
        display: none;
    }

    .column-control .checkbox button {
        color: #e4e4e4;
        padding: 10px;
    }

    .column-control .checkbox:hover > button {
        background: #f2f2f2;
        color: #4e4e4e;
        pointer-events: none;
    }

    .column-control .is-primary-key input:checked ~ button {
        color: #ed991d;
    }

    .column-control .is-nullable input:checked ~ button,
    .column-control .is-unique input:checked ~ button {
        color: #5865f2;
    }

    .column-control .constraints-button {
        position: relative;
    }

    .column-control .constraints-container {
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 15px #21212140;
        display: none;
        position: absolute;
        z-index: 1;
    }

    .column-control
        .constraints-button
        > input:checked
        ~ .constraints-container {
        display: block;
    }

    .column-control .constraints-button > input:checked ~ button {
        background: #f2f2f2;
        color: #4e4e4e;
    }

    .column-control .delete-column-button button {
        color: #db3b21;
    }

    .column-control .delete-column-button:hover button {
        background: #db3b2120;
        color: #db3b21;
        pointer-events: initial;
    }
</style>
