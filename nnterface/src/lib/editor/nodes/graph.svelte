<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";
    import { editor } from "$lib/editor/handlers/states.svelte";

    import { ChartArea } from "lucide-svelte";
    let { id, data } = $props();


    let colored = $derived(data.graphData === undefined);

    let color = $derived.by(() => {
        if (colored) {
            return "";
        }
        return "!bg-[#2e83af]/30 !border-[#2e83af]";
    });

    function openGraph() {
        if (!colored) {
            editor.rightSidebarVisible = true;
        }
    }
</script>

<div class="node justify-between flex p-3 {color} transition-all duration-1000">
    {id}
    <button onclick={openGraph}>
        <ChartArea class="h-5 w-5"/>
    </button>
    <Handle type="target" position={Position.Left} />
</div>
