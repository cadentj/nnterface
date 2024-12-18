<script lang="ts">
    import { chat as chatState } from "$lib/editor/handlers/states.svelte";
    import { fly } from "svelte/transition";
    let { flow, leftSidebar, navbar, chat } = $props();
    import { cubicOut } from 'svelte/easing';
</script>

<main class="layout">
    <div class="navbar">
        {@render navbar()}
    </div>

    <div class="sidebar">
        {@render leftSidebar()}
    </div>

    <div class="flow">
        {@render flow()}
    </div>

    {#if chatState.isVisible}
        <div 
            class="chat"
            transition:fly={{ x: 400, duration: 500, easing: cubicOut, opacity: 1 }}
        >
            {@render chat()}
        </div>
    {/if}
</main>