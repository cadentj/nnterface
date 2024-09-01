<script>
    import { SvelteFlowProvider } from "@xyflow/svelte";

    import Flow from "$lib/components/editor/flow.svelte";
    import DnDProvider from "$lib/components/editor/dnd-provider.svelte";
</script>

<SvelteFlowProvider>
    <DnDProvider>
        <Flow />
    </DnDProvider>
</SvelteFlowProvider>
