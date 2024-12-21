<script lang="ts">
    import { useNodes, type Node } from "@xyflow/svelte";
    import Line from "./line.svelte";
    import Heatmap from "./heatmap.svelte";
    import { Button } from "$lib/components/ui/button";
    import { X, Grid2X2, ChartLine } from "lucide-svelte";
    import type { GraphData } from "$lib/editor/types/nodes";
    import { Separator } from "$lib/components/ui/separator";

    type GraphType = "line" | "heatmap";

    const nodes = useNodes();

    let selectedGraphs: (string | null)[] = $state([]);
    let selectedTypes: (GraphType | null)[] = $state([]);
    let graphsData: GraphData[] = $state([]);
    let addingGraph = $state(false);
    let selecting: string[] = $state([]);

    let graphNodesData = $derived(
        $nodes
            .filter((node) => node.data.variant === "graph")
            .map((node) => ({
                id: node.id,
                isEmpty: !node.data.graphData || Object.keys(node.data.graphData).length === 0,
                data: node.data.graphData,
            }))
    );

    function handleGraphSelect(nodeId: string, idx: number) {
        const node = graphNodesData.find((n) => n.id === nodeId);
        if (!node?.isEmpty) {
            selectedGraphs[idx] = nodeId;
            graphsData[idx] = node.data;
            updateGraphState(idx);
        }
    }

    function handleTypeSelect(type: GraphType, idx: number) {
        selectedTypes[idx] = type;
        selecting[idx] = "Select a graph node";
        updateGraphState(idx);
    }

    function updateGraphState(idx: number) {
        if (selectedGraphs[idx] && selectedTypes[idx]) {
            addingGraph = false;
            selecting[idx] = selectedGraphs[idx];
        }
    }

    function addGraph() {
        selectedGraphs = [...selectedGraphs, null];
        selectedTypes = [...selectedTypes, null];
        graphsData = [...graphsData, null];
        selecting = [...selecting, "Select a graph type"];
        addingGraph = true;
    }

    function removeGraph(idx: number) {
        addingGraph = (addingGraph && selectedGraphs[idx] !== null) ? true : false;

        selectedGraphs = selectedGraphs.filter((_, i) => i !== idx);
        selectedTypes = selectedTypes.filter((_, i) => i !== idx);
        graphsData = graphsData.filter((_, i) => i !== idx);
        selecting = selecting.filter((_, i) => i !== idx);
    }
</script>

{#snippet graphOptions(idx: number)}
    <div class="grid grid-cols-2 gap-3">
        {#each [
            { type: "line", label: "Line Graph", icon: ChartLine },
            { type: "heatmap", label: "Heatmap", icon: Grid2X2 }
        ] as { type, label, icon }}
            <Button
                variant="outline"
                class="p-4 h-24"
                onclick={() => handleTypeSelect(type, idx)}
            >
                {label}
                <svelte:component this={icon} class="w-4 h-4" />
            </Button>
        {/each}
    </div>
{/snippet}

{#snippet nodeSelector(idx: number)}
    {#if graphNodesData.length === 0}
        <div class="flex flex-col items-center justify-center text-muted-foreground/60">
            <span>No graphs available</span>
        </div>
    {:else}
        <div class="grid grid-cols-2 gap-2">
            {#each graphNodesData as node}
                <Button
                    variant="outline"
                    class="p-4 h-24"
                    onclick={() => handleGraphSelect(node.id, idx)}
                    disabled={node.isEmpty}
                >
                    {node.isEmpty ? `${node.id} empty` : node.id}
                </Button>
            {/each}
        </div>
    {/if}
{/snippet}

{#snippet graphContent(idx: number)}
    <div class="flex items-center justify-between px-6 pt-6 pb-2">
        <small>{selecting[idx]}</small>
        <button onclick={() => removeGraph(idx)}>
            <X class="w-4 h-4" />
        </button>
    </div>
    {#if !selectedTypes[idx]}
        <div class="px-6 pb-6">
            {@render graphOptions(idx)}
        </div>
    {:else if !selectedGraphs[idx]}
        <div class="px-6 pb-6">
            {@render nodeSelector(idx)}
        </div>
    {:else}
        <div class="px-6 pb-6">
            <svelte:component 
            this={selectedTypes[idx] === "line" ? Line : Heatmap} 
            dataToGraph={graphsData[idx]} 
        />
        </div>
        <Separator />
    {/if}
{/snippet}

<div class="flex flex-col">
    {#each selectedGraphs as _, idx}
        {@render graphContent(idx)}
    {/each}
    
    {#if !addingGraph}
        <small class="p-6 cursor-pointer" onclick={addGraph}>
            Add graph +
        </small>
    {/if}

</div>