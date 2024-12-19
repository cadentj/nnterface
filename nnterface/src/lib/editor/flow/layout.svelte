<script lang="ts">
    import { chat } from "$lib/editor/handlers/states.svelte";
    import { fly } from "svelte/transition";
    let { flow, leftSidebar, navbar, chatTab } = $props();
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

    {#if chat.isVisible}
        <div 
            class="chat"
            transition:fly={{ x: 400, duration: 500, easing: cubicOut, opacity: 1 }}
        >
            {@render chatTab()}
        </div>
    {/if}
</main>