<script>
    import { SvelteFlowProvider } from "@xyflow/svelte";

    import Flow from "$lib/components/editor/flow.svelte";
    import DnDProvider from "$lib/components/editor/dnd-provider.svelte";
    import ConnectionProvider from "$lib/components/editor/connection-provider.svelte";
</script>

<SvelteFlowProvider>
    <ConnectionProvider>
        <DnDProvider>
            <Flow />
        </DnDProvider>
    </ConnectionProvider>
</SvelteFlowProvider>
