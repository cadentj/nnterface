<script lang="ts">
    import { type NodeProps, Position } from "@xyflow/svelte";
    import { GripVertical } from "lucide-svelte";
    import Handle from "../flow/handle.svelte";
    import Line from "./graph/line.svelte";
    import { onMount } from "svelte";

    type $$Props = NodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    $$restProps;
</script>

<div class="bg-ui-1 border">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable">
        <GripVertical class="h-5 w-5 mr-2" />
        <small class="text-sm">{type}</small>
    </div>

    <Line data={data.graphData} />

    <Handle label={type} type="target" position={Position.Left} />
</div>
