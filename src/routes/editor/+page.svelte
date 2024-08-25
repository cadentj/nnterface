<script>
    import { SvelteFlowProvider } from "@xyflow/svelte";

    import Flow from "$lib/components/editor/Flow.svelte";
    import DnDProvider from "$lib/components/editor/DnDProvider.svelte";
</script>

<SvelteFlowProvider>
    <DnDProvider>
        <Flow />
    </DnDProvider>
</SvelteFlowProvider>
