<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";

    import { ChartArea } from "lucide-svelte";
    let { id } = $props();
</script>

<div class="node justify-between flex p-3 !bg-blue-950 !border-blue-500">
    {id}
    <button>
        <ChartArea class="h-5 w-5"/>
    </button>
    <Handle type="target" position={Position.Left} />
</div>
