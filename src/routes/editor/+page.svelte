<script>
    import { SvelteFlowProvider } from "@xyflow/svelte";

    import Flow from "$lib/components/editor/flow.svelte";
    import DnDProvider from "$lib/providers/dnd.svelte";
    import ConnectionProvider from "$lib/providers/connection.svelte";
    import Logo from "./nnsight-logo.svelte"
</script>

<!-- <nav class="border-b">

</nav> -->
<SvelteFlowProvider>
    <ConnectionProvider>
        <DnDProvider>
            <Flow />
        </DnDProvider>
    </ConnectionProvider>
</SvelteFlowProvider>

<style>
    nav {
        height: 5vh;
    }
</style>
