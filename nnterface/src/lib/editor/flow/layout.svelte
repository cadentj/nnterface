<script lang="ts">
    import { editor } from "$lib/editor/handlers/states.svelte";
    let { flow, leftSidebar, navbar, rightSidebar } = $props();
</script>

<main class="layout">
    <div class="navbar">
        {@render navbar()}
    </div>

    <div class="sidebar">
        {@render leftSidebar()}
    </div>

    <div class="flow {editor.rightSidebarVisible ? '!w-[60vw]' : '!w-[80vw]'}">
        {@render flow()}
    </div>



    {#if editor.rightSidebarVisible}
        <div class="chat">
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
        @apply absolute left-[20%] top-[5vh] h-[95vh];
    }

    .layout .navbar {
        @apply absolute top-0 left-0 w-full h-[5vh] z-20 border-b;
    }

    .layout .chat {
        @apply absolute top-[5vh] right-0 h-[95vh] z-10 w-[20vw] border-l;
    }
</style>
