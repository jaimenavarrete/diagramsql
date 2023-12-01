<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import {
        IconPlus,
        IconRoute,
        IconRouteOff,
        IconTrash,
    } from '@tabler/icons-svelte';

    // Props
    export let tables;
    export let selectedTable;

    // Event handlers

    const addRelationship = () => {
        const newRelationship = {
            id: crypto.randomUUID(),
            foreignKeyFieldId: null,
            primaryKeyTableId: null,
            primaryKeyFieldId: null,
        };

        selectedTable.relationships = [
            ...selectedTable.relationships,
            newRelationship,
        ];
    };

    const deleteRelationship = (id) => {
        selectedTable.relationships = selectedTable.relationships.filter(
            (relation) => relation.id !== id
        );

        dispatch('updateTable', selectedTable);
    };
</script>

<section class="form-section">
    <h3><IconRoute /> <span>Relationships</span></h3>

    {#if !selectedTable?.relationships || selectedTable.relationships.length === 0}
        <p class="no-relationships-text">
            <span class="icon"><IconRouteOff size={32} /></span>
            <span>You have no relationships here.</span>
        </p>
    {:else}
        {#each selectedTable.relationships as relation}
            <article class="relationship-control">
                <!-- svelte-ignore a11y-autofocus -->
                <select
                    on:change={(e) => {
                        relation.foreignKeyFieldId = e.currentTarget.value;
                        dispatch('updateTable', selectedTable);
                    }}
                    value={relation.foreignKeyFieldId || ''}
                    autofocus
                >
                    <option value="">FK Field</option>

                    {#each selectedTable.columns as column}
                        {#if column.name}
                            <option value={column.id}>{column.name}</option>
                        {/if}
                    {/each}
                </select>
                <select
                    on:change={(e) => {
                        relation.primaryKeyTableId = e.currentTarget.value;
                        relation.primaryKeyFieldId = null;
                    }}
                    value={relation.primaryKeyTableId || ''}
                >
                    <option value="">PK Table</option>

                    {#each tables as table}
                        {#if table.name && table.id !== selectedTable.id}
                            <option value={table.id}>{table.name}</option>
                        {/if}
                    {/each}
                </select>
                <select
                    on:change={(e) => {
                        relation.primaryKeyFieldId = e.currentTarget.value;
                        dispatch('updateTable', selectedTable);
                    }}
                    value={relation.primaryKeyFieldId || ''}
                >
                    <option value="">PK Field</option>

                    {#if relation.primaryKeyTableId}
                        {#each tables.find((table) => table.id === relation.primaryKeyTableId)?.columns as column}
                            {#if column.name}
                                <option value={column.id}>{column.name}</option>
                            {/if}
                        {/each}
                    {/if}
                </select>
                <!-- Delete button -->
                <div
                    class="checkbox delete-relationship-button"
                    title="Delete column"
                >
                    <button
                        on:click={() => deleteRelationship(relation.id)}
                        type="button"
                    >
                        <IconTrash /></button
                    >
                </div>
            </article>
        {/each}
    {/if}

    <!-- Add relationship button -->
    <div class="form-control add-relationship-button">
        <span>
            {#if selectedTable?.relationships.length > 0}
                N° of relationships: {selectedTable?.relationships.length}
            {/if}
        </span>
        <button on:click={addRelationship}
            ><IconPlus size={22} /> Add relationship</button
        >
    </div>
</section>

<style>
    select {
        background: #f2f2f2;
        border: 1px solid #e4e4e4;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }

    select:focus {
        outline-color: #4752c7;
    }

    button {
        background: transparent;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 10px 20px;
    }

    .add-relationship-button {
        border-top: 1px solid #f2f2f2;
        margin-top: 20px;
        padding-top: 5px;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .add-relationship-button span {
        color: #4e4e4e;
        font-size: 14px;
    }

    .add-relationship-button button {
        border: 2px dashed transparent;
        color: #5865f2;
        font-size: 15px;

        font-weight: bold;
        padding: 7px 15px;
        transition: all 0.1s ease-out;
    }

    .add-relationship-button button:hover {
        background-color: #4752c720;
        border-color: #4752c7;
    }

    /* Empty relationships text */

    .no-relationships-text {
        color: #4e4e4e;
        font-size: 0.9em;
        text-align: center;
    }

    .no-relationships-text span {
        display: block;
    }

    .no-relationships-text .icon {
        background: #4752c720;
        border-radius: 100%;
        color: #4752c7;
        display: inline-block;
        margin: 0 auto 10px auto;
        padding: 7px 10px;
    }

    /*** RELATIONSHIPS STYLES ***/

    .relationship-control {
        margin-bottom: 7px;

        display: flex;
    }

    .relationship-control select {
        font-size: 14px;
        margin: 0 2px;
        padding: 0 10px;
    }

    .relationship-control .checkbox {
        cursor: pointer;
    }

    .relationship-control .checkbox select {
        display: none;
    }

    .relationship-control .checkbox button {
        color: #e4e4e4;
        padding: 10px;
    }

    .relationship-control .checkbox:hover > button {
        background: #f2f2f2;
        color: #4e4e4e;
        pointer-events: none;
    }

    .relationship-control .delete-relationship-button button {
        color: #db3b21;
    }

    .relationship-control .delete-relationship-button:hover button {
        background: #db3b2120;
        color: #db3b21;
        pointer-events: initial;
    }
</style>
