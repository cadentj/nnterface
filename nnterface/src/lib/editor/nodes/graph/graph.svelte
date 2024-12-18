<script lang="ts">
    import { Position, Handle } from "@xyflow/svelte";
    import {
        GripVertical,
        ChartLine,
        Grid2X2 as Grid,
        RotateCcw,
    } from "lucide-svelte";
    import Line from "./line.svelte";
    import { Button } from "$lib/components/ui/button/index.js";
    import Heatmap from "./heatmap.svelte";
    import { Toggle } from "$lib/components/ui/toggle/index.js";

    let { type, data, ...restProps } = $props();

    data.graphData = [];

    function clearData() {
        data.graphData = [];
    }

    let selectedGraphType = $state("line"); // Default selection
</script>

<div class="node overflow-hidden h-[225px] w-[350px]">
    <div class="flex justify-between border-b px-3 py-1 h-auto draggable">
        <div class="flex items-center">
            <GripVertical class="h-5 w-5 mr-2" />
            <small class="text-sm">{type}</small>
        </div>
        <div class="flex items-center">
            <Button variant="ghost" class= "!h-9 !w-9" on:click={clearData}>
                <RotateCcw class="h-4 w-4" />
            </Button>
            <Toggle
                size="sm"
                class="!h-9 !w-9"
                onPressedChange={() => {
                    selectedGraphType =
                        selectedGraphType === "line" ? "heatmap" : "line";
                }}
                aria-label="Toggle italic"
            >
                {#if selectedGraphType === "line"}
                    <ChartLine class="h-4 w-4" />
                {:else if selectedGraphType === "heatmap"}
                    <Grid class="h-4 w-4" />
                {/if}
            </Toggle>
        </div>
    </div>

    <div class="px-3 pt-2">
        {#if selectedGraphType === "line"}
            <Line bind:dataToGraph={data.graphData} />
        {:else if selectedGraphType === "heatmap"}
            <Heatmap data={data.graphData} />
        {/if}
    </div>

    <Handle type="target" position={Position.Left} />
</div>
