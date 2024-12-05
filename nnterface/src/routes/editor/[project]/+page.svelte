<script>
    import { SvelteFlowProvider } from "@xyflow/svelte";

    import Flow from "./components/editor.svelte";
    import DnDProvider from "$lib/providers/dnd.svelte";
    import ConnectionProvider from "$lib/providers/connection.svelte";

    export let data;
</script>

<SvelteFlowProvider>
    <ConnectionProvider>
        <DnDProvider>
            <Flow project={data.project}/>
        </DnDProvider>
    </ConnectionProvider>
</SvelteFlowProvider>