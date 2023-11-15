<script>
    import { IconPlus, IconRoute, IconRouteOff } from '@tabler/icons-svelte';

    // Props
    export let selectedTable;

    // Event handlers

    const addRelationship = () => {
        const newRelationship = {
            id: crypto.randomUUID(),
            foreignKeyFieldId: null,
            referencedTableId: null,
            referencedField: null,
        };

        selectedTable.relationships = [
            ...selectedTable.relationships,
            newRelationship,
        ];
    };
</script>

<section class="form-section">
    <h3><IconRoute /> <span>Relationships</span></h3>

    {#if !selectedTable?.relationships || selectedTable.relationships.length === 0}
        <p class="no-relationships-text">
            <span><IconRouteOff size={32} /></span>
            You have no relationships here.
        </p>
    {/if}

    <div class="form-control add-column-button">
        <span>N° of relationships: {selectedTable?.relationships.length}</span>
        <button on:click={addRelationship}
            ><IconPlus size={22} /> Add relationship</button
        >
    </div>
</section>

<style>
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

    /* Empty relationships text */

    .no-relationships-text {
        color: #4e4e4e;
        font-size: 0.9em;
        text-align: center;
    }

    .no-relationships-text span {
        display: block;
    }
</style>
