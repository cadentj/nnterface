<script>
    import { SvelteFlowProvider } from "@xyflow/svelte";

    import Flow from "$lib/components/editor/flow.svelte";
    import DnDProvider from "$lib/components/providers/dnd.svelte";
    import ConnectionProvider from "$lib/components/providers/connection.svelte";
</script>

<SvelteFlowProvider>
    <ConnectionProvider>
        <DnDProvider>
            <Flow />
        </DnDProvider>
    </ConnectionProvider>
</SvelteFlowProvider>
