<script lang="ts">
    import { type NodeProps, Position } from "@xyflow/svelte";
    import { GripVertical } from "lucide-svelte";
    import Handle from "../utils/handle.svelte";
    import Line from "./graph/line.svelte";

    type $$Props = NodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    let graphData = data.graphData || [];

    function buildData(d: number[]) {
        return d.map((row, i) => ({ year: i, count: row }));
    }

    $$restProps;
</script>

<div class="bg-ui-1 border">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable">
        <GripVertical class="h-5 w-5 mr-2" />
        <small class="text-sm">{type}</small>
    </div>

    <Line d={buildData(graphData)} />

    <Handle label={type} type="target" position={Position.Left} />
</div>
