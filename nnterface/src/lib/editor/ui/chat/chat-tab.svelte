<script lang="ts">
    import { modelSelector } from "$lib/editor/handlers/states.svelte";
    import Chat from "./chat.svelte";
    import Generation from "./generation.svelte";
</script>

<main class="p-6 bg-card">
    {#if modelSelector.isChatModel}
        <Chat />
    {:else}
        <Generation />
    {/if}
</main>

<style>
    main {
        height: calc(100vh - 4rem);
    }
</style>
