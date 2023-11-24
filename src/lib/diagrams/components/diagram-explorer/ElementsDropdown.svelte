<script>
    import {
        IconChevronRight,
        IconCurrentLocation,
        IconTable,
        IconTrash,
    } from '@tabler/icons-svelte';

    export let buttonText;
    export let elements;
    export let selectedElement;

    export let deleteElement;
</script>

<div class="dropdown">
    <label class="dropdown-button">
        <span class="left-content">
            <input type="checkbox" class="dropdown-check" checked />
            <span class="arrow"><IconChevronRight size={20} /></span>
            <slot name="icon"><IconTable size={20} /></slot>
            <span class="text">{buttonText}</span>
        </span>
        <span class="right-content">
            <div class="elements-count">{elements.length}</div>
        </span>
    </label>

    <div class="dropdown-content">
        {#if !elements || elements.length === 0}
            <p class="no-elements-text">There are no elements</p>
        {:else}
            <ul>
                {#each elements as element}
                    <li
                        style:--color={element.color}
                        class="dropdown-item"
                        class:active={element === selectedElement}
                    >
                        <span class="left-content">
                            {element.name || 'No name'}
                        </span>
                        <span class="right-content">
                            <button
                                on:click={() => (selectedElement = element)}
                                class="action-button"
                            >
                                <IconCurrentLocation size={22} />
                            </button>
                            <button
                                on:click={() => deleteElement(element)}
                                class="action-button delete-button"
                                title="Delete table"
                            >
                                <IconTrash size={22} />
                            </button>
                        </span>
                    </li>
                {/each}
            </ul>
        {/if}
    </div>
</div>

<style>
    /*** DROPDOWN STYLES ***/

    .dropdown .dropdown-content ul {
        list-style-type: none;
    }

    .dropdown:has(:checked) {
        --rows: 1fr;
    }

    .dropdown:has(:checked) .dropdown-content {
        margin: 5px 0 10px 0;
    }

    .dropdown .action-button {
        background-color: transparent;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 7px;
    }

    .dropdown .action-button:hover {
        background-color: #5865f220;
        color: #4752c7;
    }

    .dropdown .action-button.delete-button {
        color: #de3a2b;
    }

    .dropdown .action-button.delete-button:hover {
        background-color: #de3a2b20;
    }

    .dropdown .dropdown-button,
    .dropdown .dropdown-content li {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .dropdown .dropdown-button {
        border: 1px solid transparent;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.95em;
        padding: 10px;
        transition: all 0.2s ease-out;
    }

    .dropdown:has(:checked) .dropdown-button {
        background-color: #f2f2f2;
    }

    .dropdown .dropdown-button:hover {
        background-color: #5865f220;
        color: #4752c7;
    }

    .dropdown .dropdown-button .left-content {
        display: flex;
    }

    .dropdown .dropdown-button .text {
        margin-left: 5px;
    }

    .dropdown .dropdown-button .text span {
        margin-left: 7px;
    }

    .dropdown .dropdown-button .dropdown-check {
        display: none;
    }

    .dropdown .dropdown-button .arrow {
        margin-right: 10px;
        transition: transform 0.2s ease-out;

        display: flex;
        align-items: center;
    }

    .dropdown .dropdown-check:checked ~ .arrow {
        transform: rotate(90deg);
    }

    .dropdown .dropdown-button .elements-count {
        background: #5865f2;
        border-radius: 50%;
        color: #fff;
        font-size: 0.75em;
        font-weight: bold;
        height: 20px;
        padding-top: 2px;
        width: 20px;

        display: grid;
        place-content: center;
    }

    .dropdown .dropdown-content {
        display: grid;
        grid-template-rows: var(--rows, 0fr);
        transition: grid-template-rows 0.2s ease-out;
    }

    .dropdown .dropdown-content ul,
    .dropdown .dropdown-content .no-elements-text {
        overflow: hidden;
    }

    .dropdown .dropdown-content li {
        border-left: 3px solid var(--color);
        font-size: 0.85em;
        margin-left: 30px;
        padding: 5px 10px;
        padding-left: 15px;
        position: relative;
    }

    .dropdown .dropdown-content li:hover,
    .dropdown .dropdown-content li.active {
        background-color: #5865f220;
        color: #4752c7;
    }

    .dropdown .dropdown-content li::before {
        content: '';

        background-color: #fff;
        border: 3px solid var(--color);
        border-radius: 100%;
        display: inline-block;
        height: 7px;
        left: 0;
        position: absolute;
        top: 50%;
        transform: translate(-60%, -50%);
        width: 7px;
    }

    .dropdown .dropdown-content li .right-content {
        display: flex;
        justify-content: center;
    }

    /* No elements text */

    .dropdown .dropdown-content .no-elements-text {
        color: #b3b3b3;
        font-size: 0.9em;
        text-align: center;
    }
</style>
