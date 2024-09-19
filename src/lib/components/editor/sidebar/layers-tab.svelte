<script>
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import { useNodes } from "@xyflow/svelte";

    const nodes = useNodes();

    const flipDurationMs = 300;
    function handleDndConsider(e) {
        $nodes = e.detail.items;
    }
    function handleDndFinalize(e) {
        $nodes = e.detail.items;
    }
</script>

<div class="p-10">
    <div class="container">
        <section
        class="pointer-events-auto p-3 flex-col-reverse flex h-auto"
        use:dndzone={{ items: $nodes, flipDurationMs }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
    >
        {#each $nodes as node (node.id)}
            <div
                class="h-12 bg-ui-2 my-1 text-center border rounded-md"
                animate:flip={{ duration: flipDurationMs }}
            >
                {node.id}
            </div>
        {/each}
    </section>
    </div>
</div>

<style>
    section {
        width: 100%;
    }

    .container {
        outline: none;

        height: 70vh;
        @apply bg-ui-1 rounded-lg;
    }
</style>
