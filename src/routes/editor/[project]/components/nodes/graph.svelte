<script lang="ts">
    import { type NodeProps, Position } from "@xyflow/svelte";
    import { GripVertical } from "lucide-svelte";
    import Handle from "../flow/handle.svelte";
    import Line from "./graph/line.svelte";
    import Heatmap from "./graph/heatmap.svelte"; // Ensure this import is uncommented
    import * as Select from "$lib/components/ui/select";

    type $$Props = NodeProps;

    export let type: $$Props["type"];
    export let data: $$Props["data"];

    data.graphData = [];
    
    let selectedGraphType = "line"; // Default selection

    function updateGraphType(value: string) {
        selectedGraphType = value;
    }

        
    $$restProps;
</script>

<div class="bg-ui-1 border">
    <div class="flex items-center border-b px-3 py-2 h-auto draggable">
        <GripVertical class="h-5 w-5 mr-2" />
        <small class="text-sm">{type}</small>
    </div>
    <div class="px-5 py-2 grid grid-cols-4 gap-4 items-center">
        <span class="text-sm col-span-1">Graph Type</span>
        <div class="col-span-3">
            <Select.Root onSelectedChange={(value) => updateGraphType(value.value)}>
                <Select.Trigger>
                    <Select.Value placeholder={selectedGraphType}/>
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="line">Line</Select.Item>
                    <Select.Item value="heatmap">Heatmap</Select.Item>
                </Select.Content>
            </Select.Root>
        </div>
    </div>

    {#if selectedGraphType === 'line'}
        <Line data={data.graphData} />
    {:else if selectedGraphType === 'heatmap'}
        <Heatmap data={data.graphData} />
    {/if}

    <Handle label={type} type="target" position={Position.Left} />
</div>
