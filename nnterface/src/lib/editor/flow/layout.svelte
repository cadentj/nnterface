<script lang="ts">
    import { chat } from "$lib/editor/handlers/states.svelte";
    import { fly } from "svelte/transition";
    let { flow, leftSidebar, navbar, rightSidebar } = $props();
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
            {@render rightSidebar()}
        </div>
    {/if}
</main>

<style lang="postcss">
    .layout {
        @apply relative h-screen w-screen overflow-hidden;
    }

    .layout .sidebar {
        @apply w-[20vw] top-[5vh] absolute left-0 h-full border-r;
    }

    .layout .flow {
        @apply absolute left-[20%] top-[5vh] h-[95vh] w-[80vw];
    }

    .layout .navbar {
        @apply absolute top-0 left-0 w-full h-[5vh] z-20 border-b;
    }

    .layout .chat {
        @apply absolute top-[5vh] right-0 h-[95vh] z-10 w-[20vw] border-l;
    }
</style>