<script lang="ts">
    import { chat as chatState } from "$lib/editor/handlers/states.svelte";
    let { flow, leftSidebar, navbar, chat } = $props();
</script>

<main class="layout">
    <div class="navbar">
        {@render navbar()}
    </div>

    <div class="flow">
        {@render flow()}
    </div>

    <div class="sidebar">
        {@render leftSidebar()}
    </div>

    {#if chatState.isVisible}
        <div class="chat">
            {@render chat()}
        </div>
    {/if}
</main>